/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import { SQSClient } from '@aws-sdk/client-sqs';

@Injectable()
export class OrdersWorker implements OnModuleInit, OnModuleDestroy {
  private consumer: Consumer;

  async onModuleInit() {
    console.log('--- Worker: Initializing SQS Consumer ---');
    
    this.consumer = Consumer.create({
    queueUrl: process.env.AWS_SQS_INVENTORY_QUEUE_URL!, 
    sqs: new SQSClient({ 
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
    }),
      // This function runs whenever a message arrives
      handleMessage: async (message) => {
        try {
          // 1. Unwrap the SNS "Envelope"
          const snsBody = JSON.parse(message.Body!);
          // 2. Unwrap the actual Order Data (which is inside the 'Message' string)
          const order = JSON.parse(snsBody.Message);

          console.log('=================================');
          console.log(`[Worker] 🚚 New Order Received!`);
          console.log(`[Worker] 👤 User ID: ${order.userId}`);
          console.log(`[Worker] 📦 Items: ${order.items.join(', ')}`);
          console.log(`[Worker] 💰 Total: $${order.totalPrice}`);

          // Simulate Database Work (Wait 2 seconds)
          await new Promise(resolve => setTimeout(resolve, 2000));

          console.log(`[Worker] ✅ Inventory Updated. Stock Reserved.`);
          console.log('=================================');
          return message;
        } catch (error) {
          console.error('[Worker] ❌ Error processing message:', error);
        }
      },
    });

    // Listen for connection errors
    this.consumer.on('error', (err) => {
      console.error('[Worker] 🔴 SQS Error:', err.message);
    });

    this.consumer.on('processing_error', (err) => {
      console.error('[Worker] 🟠 Processing Error:', err.message);
    });

    // Start the polling loop
    this.consumer.start();
    console.log(`[Worker] 🚀 Listening on ${process.env.AWS_SQS_inventory_queue}`);
  }

  onModuleDestroy() {
    if (this.consumer) {
      this.consumer.stop();
    }
  }
}