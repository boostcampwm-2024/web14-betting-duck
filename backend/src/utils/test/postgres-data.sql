-- 테스트를 위한 임시 데이터를 PostgreSQL에 저장하는 스크립트입니다.
-- 다음과 같이 실행할 수 있습니다.
-- psql -U <username> -d <database_name> -f <sql_file_path>


DO $$
DECLARE
  room_id UUID;
  user_id INTEGER;
BEGIN
  room_id := gen_random_uuid();

  INSERT INTO "bet_rooms" (id, "managerId", title, "defaultBetAmount", option1, option2, status, "joinUrl", timer)
  VALUES (room_id, (SELECT id FROM "users" LIMIT 1), 'test_bet_room_1', 100, 'option1', 'option2', 'active', 'testurl', 1);

  FOR i IN 1..500 LOOP
    INSERT INTO "users" (email, nickname, password, duck)
    VALUES ('test_' || i || '@email.com', 'test_nickname_' || i, 'test-pw', 300)
    RETURNING id INTO user_id;

    INSERT INTO "bets" ("betRoomId", "betAmount", "settledAmount", status, "selectedOption", "userId")
    VALUES (room_id, 100, 100, 'settled', 'option1', user_id);
  END LOOP;
END $$;

