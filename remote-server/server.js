// socket.io stuff
const io = require("socket.io")(3500, {
  cors: {
    origins: "*:*",
  },
});

io.on("connection", (socket) => {
  console.log("Connection");
  socket.on("send-message", (message) => {
    console.log(message);
    produceMessage(message);
    // socket.broadcast.emit("recieve-message", message);
  });
});

// Kafka Producer
const { Kafka, Partitioners } = require("kafkajs");
require("dotenv").config();

const kafka = new Kafka({
  clientId: "tutorlink-server-producer",
  brokers: ["pkc-6ojv2.us-west4.gcp.confluent.cloud:9092"],
  ssl: true,
  logLevel: 2,
  sasl: {
    mechanism: "plain",
    username: process.env.CONFLUENT_USERNAME,
    password: process.env.CONFLUENT_PASSWORD,
  },
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const kafka_consumer = new Kafka({
  clientId: "ss-client",
  brokers: ["pkc-lzvrd.us-west4.gcp.confluent.cloud:9092"],
  ssl: true,
  logLevel: 2,
  groupId: "ss-consumer",
  sasl: {
    mechanism: "plain", // scram-sha-256 or scram-sha-512
    username: "IE2M2C4J7W5TEG66",
    password:
      "2LjS/kUBsDmuX1kj8eiOypggQzt5B/LhmAFubl7GqvbVI4thCB08GQbvo5fvtnUn",
  },
});

const consumer = kafka.consumer({ groupId: "tutrolink-server" });

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Producer Successfuly Connected");
  } catch (e) {
    console.log(e);
  }
};

connectProducer();
console.log(producer);

const produceMessage = async (message) => {
  await producer.send({
    topic: "send-queue",
    messages: [{ value: message["message"] }],
  });
  console.log("sent message");
};

const consumeMessages = async () => {
  try {
    console.log("waiting to consume");
    consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          console.log("---Consumed---");
          console.log(message.value.toString());
          console.log("HERE");
          io.emit("recieve-message", message.value.toString());
          console.log("HERE2");
        } catch (e) {}
      },
    });
  } catch (e) {
    console.log(e);
    // consumeMessages();
  }
};

const connectConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topics: ["predict-queue"] });
    console.log("Consumer Successfuly Connected");
    consumeMessages();
  } catch (e) {
    console.log(e);
  }
};

// Connect to the confluent broker

connectConsumer();
