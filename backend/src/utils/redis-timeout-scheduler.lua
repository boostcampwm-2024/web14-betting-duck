local streamKey = 'stream:' .. KEYS[1]
local pelKey = streamKey .. ':pel'

-- pel 확인 스크립트
local message = redis.call('LINDEX', pelKey, 0)
if message then
    if redis.call('EXISTS', pelKey .. message) ~= 1 then
        redis.call('RPOPLPUSH', pelKey, streamKey)
        redis.call("HSET", message, 'event_status', 'pending')
    end
end

-- EXECUTE COMMAND : redis-cli --eval ./test_key.lua users