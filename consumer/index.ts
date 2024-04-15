import amqp, { ConsumeMessage } from "amqplib";

(async () => {
  try {
    const connection = await amqp.connect("amqp://admin:admin@localhost:3771");
    const channel = await connection.createChannel();
    const queue = "hello";

    channel.assertQueue(queue, { durable: false });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, handleMessage, { noAck: true });
  } catch (error) {
    console.error(error);
  }
})();

function handleMessage(msg: ConsumeMessage | null): void {
  if (!msg) return;

  console.log(" [x] Received %s", msg.content.toString());
}
