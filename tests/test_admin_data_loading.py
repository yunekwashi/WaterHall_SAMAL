from backend.db_adapter import DBConnection, get_db


def test_all_data_batches_monthly_history_without_changing_order(system, monkeypatch):
    client, headers, _ = system

    with get_db() as db:
        # Interleave global bill IDs so batching must still retain each meter's
        # newest four values in chronological order, including a zero reading.
        for meter_id, consumption in [
            (1, 20), (2, 0), (1, 30), (2, 7), (1, 40),
            (2, 8), (1, 50), (2, 9), (1, 60),
        ]:
            db.execute(
                'INSERT INTO billing_records '
                '(meter_id, previous_reading, present_reading, consumption_m3, total_amount) '
                'VALUES (?, 0, ?, ?, 170)',
                (meter_id, consumption, consumption),
            )

    statements = []
    original_execute = DBConnection.execute

    def capture_execute(connection, query, params=None):
        statements.append(' '.join(query.lower().split()))
        return original_execute(connection, query, params)

    monkeypatch.setattr(DBConnection, 'execute', capture_execute)

    response = client.get('/api/all-data?role=admin', headers=headers['admin'])
    small_request_statements = list(statements)

    assert response.status_code == 200
    households = {household['house_id']: household for household in response.json['households']}
    assert households['HH-1']['monthly_history'] == [30, 40, 50, 60]
    assert households['HH-2']['monthly_history'] == [0, 7, 8, 9]
    assert all('meter_id' not in record for record in response.json['billingRecords'])

    statements.clear()
    with get_db() as db:
        # One household deliberately has no meter; the rest bring the dataset
        # to 50 metered households without increasing request query count.
        db.execute(
            'INSERT INTO households '
            '(purok_id, family_head_name, registration_date, password_hash) '
            "VALUES (1, 'No Meter', '2026-01-01', 'unused')"
        )
        no_meter_household = db.lastrowid
        for number in range(3, 51):
            db.execute(
                'INSERT INTO households '
                '(purok_id, family_head_name, registration_date, password_hash) '
                "VALUES (1, ?, '2026-01-01', 'unused')",
                (f'Resident {number}',),
            )
            household_id = db.lastrowid
            db.execute(
                'INSERT INTO water_meters (household_id, serial_number) VALUES (?, ?)',
                (household_id, f'METER-{household_id}'),
            )
            meter_id = db.lastrowid
            db.execute(
                'INSERT INTO billing_records '
                '(meter_id, previous_reading, present_reading, consumption_m3, total_amount) '
                'VALUES (?, 0, 1, 1, 170)',
                (meter_id,),
            )

    statements.clear()
    large_response = client.get('/api/all-data?role=admin', headers=headers['admin'])
    large_request_statements = list(statements)

    assert large_response.status_code == 200
    large_households = {
        household['house_id']: household for household in large_response.json['households']
    }
    assert large_households[f'HH-{no_meter_household}']['monthly_history'] == []
    assert len(small_request_statements) == len(large_request_statements) == 13
    assert sum('from billing_records' in statement for statement in small_request_statements) == 1
    assert sum('from billing_records' in statement for statement in large_request_statements) == 1
    assert not any(
        'select consumption_m3 from billing_records where meter_id' in statement
        for statement in small_request_statements + large_request_statements
    )

    resident_response = client.get('/api/all-data', headers=headers['HH-1'])
    worker_response = client.get('/api/all-data', headers=headers['worker'])
    assert [household['house_id'] for household in resident_response.json['households']] == ['HH-1']
    assert resident_response.json['households'][0]['monthly_history'] == [30, 40, 50, 60]
    assert any(
        household['house_id'] == 'HH-1' and household['monthly_history'] == [30, 40, 50, 60]
        for household in worker_response.json['households']
    )
