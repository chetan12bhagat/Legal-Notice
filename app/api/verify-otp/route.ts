import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ success: false, message: 'Email and OTP are required' }, { status: 400 });
    }

    // Fetch OTP record from DynamoDB
    const result = await dynamo.send(new GetItemCommand({
      TableName: process.env.DYNAMODB_TABLE_USERS || 'Users',
      Key: { email: { S: email } },
    }));

    const item = result.Item;

    if (!item || !item.otp) {
      return NextResponse.json({ success: false, message: 'OTP not found. Please request a new code.' }, { status: 401 });
    }

    // Check expiry
    const expiresAt = parseInt(item.expiresAt?.N || '0', 10);
    if (Math.floor(Date.now() / 1000) > expiresAt) {
      return NextResponse.json({ success: false, message: 'OTP has expired. Please request a new code.' }, { status: 401 });
    }

    // Check OTP value
    if (item.otp.S !== otp) {
      return NextResponse.json({ success: false, message: 'Invalid verification code. Please try again.' }, { status: 401 });
    }

    // OTP valid — clear it and mark user as active
    await dynamo.send(new UpdateItemCommand({
      TableName: process.env.DYNAMODB_TABLE_USERS || 'Users',
      Key: { email: { S: email } },
      UpdateExpression: 'REMOVE #o SET #s = :active',
      ExpressionAttributeNames: { '#o': 'otp', '#s': 'status' },
      ExpressionAttributeValues: { ':active': { S: 'active' } },
    }));

    const user = {
      email,
      role: item.role?.S || 'user',
      token: `auth-${email}-${Date.now()}`,
    };

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error('Verify OTP Error:', error.message);
    return NextResponse.json(
      { success: false, message: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
