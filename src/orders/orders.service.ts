import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

@Injectable()
export class OrdersService {
  private sns = new SNSClient({ 
    region: process.env.AWS_REGION,
    // Credentials are auto-loaded from env vars if named correctly
    // (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
  });

  async placeOrder(userId: string, orderData: CreateOrderDto) {
    const event = {
      userId,
      ...orderData,
      timestamp: new Date().toISOString(),
    };
    // ... inside placeOrder method
    console.log('--- DEBUG SNS ---');
    console.log('Attempting to publish to:', process.env.AWS_SNS_TOPIC_ARN);
    console.log('Length of ARN:', process.env.AWS_SNS_TOPIC_ARN?.length); // Check for hidden spaces
    // ...
    // Publish to SNS Topic (Fan-out)
    await this.sns.send(new PublishCommand({
      TopicArn: process.env.AWS_SNS_TOPIC_ARN,
      Message: JSON.stringify(event),
    }));

    return { status: 'Order placed, processing started', event };
  }
}