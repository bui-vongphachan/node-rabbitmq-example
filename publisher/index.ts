import * as amqp from "amqplib";

(async () => {
  try {
    const conn = await amqp.connect("amqp://admin:admin@localhost:3771");
    
    const ch = await conn.createChannel();
    const q = "hello";

    await ch.assertQueue(q, { durable: false });
    await ch.sendToQueue(q, Buffer.from("SUS MAH Hello World!"));
    console.log(" [x] Sent 'Hello World!'");
  } catch (err) {
    console.log(err);
  }
})();
