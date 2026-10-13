/* Hide Worker navigation while Android resizes the WebView for the keyboard.
   Native viewInsets is authoritative; visualViewport also covers browsers. */
(() => {
  let nativeOpen = false;
  let fullHeight = innerHeight;
  const editable = () => document.activeElement?.matches('input,textarea,select');
  function update() {
    const height = window.visualViewport?.height || innerHeight;
    if (!editable() && !nativeOpen) fullHeight = Math.max(fullHeight, innerHeight);
    const open = nativeOpen || (editable() && fullHeight - height > 120);
    document.documentElement.classList.toggle('worker-keyboard-open', !!open);
  }
  window.waterhallKeyboardChanged = open => { nativeOpen = !!open; update(); };
  window.visualViewport?.addEventListener('resize', update);
  window.addEventListener('resize', update);
  document.addEventListener('focusin', update);
  document.addEventListener('focusout', () => setTimeout(update, 0));
})();
