import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email, role = 'user' } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Math.floor(Date.now() / 1000) + 600; // 10 minutes (Unix timestamp for DynamoDB TTL)

    // Store OTP in DynamoDB
    await dynamo.send(new PutItemCommand({
      TableName: process.env.DYNAMODB_TABLE_USERS || 'Users',
      Item: {
        email: { S: email },
        otp: { S: otp },
        role: { S: role },
        expiresAt: { N: expiresAt.toString() },
        status: { S: 'pending' },
      },
    }));

    // Send via Gmail SMTP using Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Nyay Platform" <${process.env.EMAIL_SENDER}>`,
      to: email,
      subject: `${otp} is your Nyay Platform verification code`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; padding: 40px 30px; max-width: 520px; margin: auto; background: #0a0f1e; border-radius: 16px; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c5a059; font-size: 28px; font-weight: 800; margin: 0;">Nyay Platform</h1>
            <p style="color: #94a3b8; font-size: 12px; letter-spacing: 3px; margin-top: 4px; text-transform: uppercase;">India's Digital Legal Platform</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: white; font-size: 18px; margin-top: 0; font-weight: 700;">Verify your email address</h2>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">Use the code below to complete your sign-in to Nyay Platform. This code is valid for <strong>10 minutes</strong>.</p>
            <div style="background: #0a0f1e; color: #c5a059; text-align: center; font-size: 44px; font-weight: 800; letter-spacing: 14px; padding: 28px 16px; border-radius: 12px; margin: 28px 0; font-family: monospace; border: 1px solid #c5a059;">
              ${otp}
            </div>
            <p style="#64748b; font-size: 12px; margin: 0;">If you didn't request this, you can safely ignore this email.</p>
          </div>
          <p style="text-align: center; color: #64748b; font-size: 11px; margin-top: 28px;">© 2026 Nyay Platform &nbsp;·&nbsp; India's Digital Legal Platform</p>
        </div>
      `,
    });

    console.log(`✅ OTP sent to ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to your email inbox',
    });
  } catch (error: any) {
    console.error('Send OTP Error:', error.message);
    return NextResponse.json(
      { success: false, message: `Failed to send email: ${error.message}` },
      { status: 500 }
    );
  }
}
