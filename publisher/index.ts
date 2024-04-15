import * as amqp from "amqplib";

(async () => {
  try {
    const conn = await amqp.connect("amqp://admin:admin@localhost:5672");

    const ch = await conn.createChannel();
    const q = "hello";

    const massage = "Hello World!";

    await ch.assertQueue(q, { durable: false });
    await ch.sendToQueue(q, Buffer.from(massage));
    console.log(` [x] Sent ${massage}`);
  } catch (err) {
    console.log(err);
  }
})();
