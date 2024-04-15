import amqp, { ConsumeMessage } from "amqplib";

(async () => {
  try {
    const connection = await amqp.connect("amqp://admin:admin@localhost:5672");
    const channel = await connection.createChannel();
    const queue = "hello";

    channel.assertQueue(queue, { durable: false });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, async (msg) => await handleMessage(msg, channel), {
      noAck: false,
    });
  } catch (error) {
    console.error(error);
  }
})();

async function handleMessage(
  msg: ConsumeMessage | null,
  channel: amqp.Channel
): Promise<void> {
  if (!msg) return;

  console.log(" [x] Received %s", msg.content.toString());

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(" [x] Done");
      channel.ack(msg);

      resolve(null);
    }, 10000);
  });
}
