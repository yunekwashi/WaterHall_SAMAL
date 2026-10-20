import 'dart:async';
import 'dart:convert';
import 'dart:html';
import 'db.dart';
import 'offline_store.dart';

/// Resident-only connection gate. It never reloads the document or clears drafts.
class ResidentConnection {
  final Database db;
  final void Function() onRecovered;
  final DivElement screen = DivElement()..id = 'resident-connection-screen'
    ..className = 'resident-connection-screen';
  final HeadingElement title = HeadingElement.h2();
  final ParagraphElement message = ParagraphElement();
  final ButtonElement button = ButtonElement()..id = 'resident-connection-retry'
    ..className = 'btn'..text = 'Retry';
  bool ready = false;
  bool _busy = false;
  int _generation = 0;

  ResidentConnection(this.db, this.onRecovered) {
    screen.attributes.addAll({'role': 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'resident-connection-title'});
    title.id = 'resident-connection-title';
    final card = DivElement()..className = 'resident-connection-card';
    card.children.addAll([ImageElement(src: 'logo.png')..alt = 'WaterHall', title, message, button]);
    screen.append(card);
    document.body!.append(screen);
    button.onClick.listen((_) => retry());
    window.onOffline.listen((_) => _fail(null));
    window.onOnline.listen((_) => retry());
    window.addEventListener('waterhall-request-unavailable', (_) => _fail(null));
    window.addEventListener('waterhall-api-unavailable', (event) {
      final status = (event as CustomEvent).detail;
      _fail(status is int ? status : null);
    });
    window.addEventListener('waterhall-session-ending', (_) {
      _generation++;
      _busy = false;
      _show(false); // The existing secure login flow owns expired sessions.
    });
    db.onSyncStatusChange.listen((status) {
      if (_busy) return;
      if (status['isOnline'] == true && _residentSession) _success();
      else if (status['isOnline'] == false && status['authenticated'] == true) _fail(db.lastConnectionStatus);
    });
    _loading();
  }

  bool get _residentSession => hasUsableSession() && window.localStorage['waterhall_resident_session'] != null;

  void _show(bool visible) {
    screen.hidden = !visible;
    final app = document.querySelector('.device-container');
    if (visible) app?.setAttribute('inert', '');
    else app?.attributes.remove('inert');
  }

  void _loading() {
    ready = false;
    title.text = 'Connecting…';
    message.text = 'Checking the WaterHall connection…';
    button..text = 'Retrying…'..disabled = true;
    _show(true);
  }

  void _fail(int? status) {
    ready = false;
    title.text = status == null ? 'Internet Error' : 'Service Unavailable';
    message.text = status == null
      ? 'No internet connection. Please check your connection and try again.'
      : status == 429 ? 'Too many requests. Please try again shortly.'
      : 'WaterHall is temporarily unavailable. Please try again.';
    button..text = 'Retry'..disabled = _busy;
    _show(true);
  }

  void _success() {
    if (window.navigator.onLine == false) { _fail(null); return; }
    final recovered = !ready;
    ready = true;
    _show(false);
    if (recovered) onRecovered();
  }

  Future<void> start() async {
    if (_residentSession) {
      if (db.isDatabaseOnline) _success();
      else _fail(db.lastConnectionStatus);
    } else { await retry(); }
  }

  Future<void> retry() async {
    if (_busy) return;
    _busy = true;
    final generation = _generation;
    _loading();
    try {
      bool ok;
      if (_residentSession) {
        if (db.isRefreshing) {
          await db.onSyncStatusChange.first.timeout(Database.requestTimeout);
          ok = db.isDatabaseOnline;
        } else { ok = await db.refreshData(role: 'resident'); }
      } else {
        final response = await db.apiRequest('/api/ready', authenticated: false);
        ok = json.decode(response.responseText ?? '{}')['status'] == 'ready';
        if (!ok) throw const ApiFailure(status: 502);
      }
      if (generation != _generation) return;
      if (ok) _success();
      else _fail(db.lastConnectionStatus);
    } on ApiFailure catch (failure) {
      if (generation != _generation || failure.sessionChanged) return;
      _fail(failure.status);
    } catch (_) {
      if (generation == _generation) _fail(502);
    } finally {
      if (generation == _generation) {
        _busy = false;
        button..text = 'Retry'..disabled = false;
      }
    }
  }
}
