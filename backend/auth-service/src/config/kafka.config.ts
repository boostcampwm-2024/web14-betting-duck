import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig = (): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [process.env.KAFKA_BROKER || 'localhost:9093'], // Kafka 브로커 주소
    },
    consumer: {
      groupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'my-consumer-group', // 소비자 그룹 ID 설정
    },
  },
});