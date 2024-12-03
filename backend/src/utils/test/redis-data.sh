#!/bin/bash
# 테스트를 위한 임시 데이터를 Redis에 저장하는 스크립트입니다.

room_id=2bbf4e10-af77-4714-bdcd-ac33f0dd9f76

redis-cli SET "room:$room_id:creator" "user:2"
redis-cli SET "room:$room_id:status" "active"
redis-cli HSET "room:$room_id:option1" participants 100 currentBets 30000
redis-cli HSET "room:$room_id:option2" participants 100 currentBets 60000

for i in {1..500}
do
  if ! redis-cli SADD "room:$room_id:userlist" "room:$room_id:user:$i"; then
    echo "Failed to set data for user:$i" >&2
    exit 1
  fi

  if ! redis-cli HSET "user:$i" nickname "test_nickname_$i" role "user" duck 300; then
    echo "Failed to set data for user:$i" >&2
    exit 1
  fi

  if ! redis-cli HSET "room:$room_id:user:$i" nickname "test_nickname_$i" owner 0 role user betAmount 100 selectedOption option1; then
    echo "Failed to push data to list room:$room_id:user:$i" >&2
    exit 1
  fi
done

echo "Test data has been saved to Redis."
