import { Kafka } from "kafkajs";

// Kafka Producer
const kafka_producer = new Kafka({
  clientId: "uqwxeifm",
  brokers: ["dory.srvs.cloudkafka.com:9094"],
  ssl: true,
  logLevel: 2,
  sasl: {
    mechanism: "plain",
    username: "uqwxeifm",
    password: "hjgvLj3pm7RYR4ERJ13yyYMCUXf8zg17",
  },
});

const producer = kafka_producer.producer();

try {
  await producer.connect();
  console.log("Producer Successfuly Connected");
} catch (e) {
  console.log(e);
}

export default produceMessage = async (message) => {
  await producer.send({
    topic: "mediate-queue",
    messages: [{ value: message }],
  });
  console.log("sent message");
};

// Kafka Consumer
// const kafka_consumer = new Kafka({
//   clientId: "ss-client",
//   brokers: ["pkc-lzvrd.us-west4.gcp.confluent.cloud:9092"],
//   ssl: true,
//   logLevel: 2,
//   groupId: "ss-consumer",
//   sasl: {
//     mechanism: "plain", // scram-sha-256 or scram-sha-512
//     username: "7ELFNKFFNBRYAGCD",
//     password:
//       "zXCGOM9BKXWeCQoioRDYzx6daKPo3vFh1PoK3ZHc0wYdBluUZEPnKMm/3bijwmP5",
//   },
// });

// const consumer = kafka_consumer.consumer({ groupId: "ss-chatroom-client" });

// const consumeMessages = async () => {
//   try {
//     console.log("waiting to consume");
//     consumer.run({
//       eachMessage: async ({ topic, message }) => {
//         try {
//           const res = JSON.parse(message.value.toString());
//           console.log("---Consumed---");
//           console.log(message.value.toString());
//           console.log(res);
//           const socket = io.sockets.sockets.get(res.from);
//           socket.broadcast.emit("recieve-message", res);
//         } catch (e) {}
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     // consumeMessages();
//   }
// };

// const connectConsumer = async () => {
//   try {
//     await consumer.connect();
//     await consumer.subscribe({ topics: ["flagged-queue", "clean-queue"] });
//     console.log("Consumer Successfuly Connected");
//     consumeMessages();
//   } catch (e) {
//     console.log(e);
//   }
// };

// Connect to the confluent broker

// connectConsumer();
