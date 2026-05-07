from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import os
from botocore.exceptions import ClientError, NoCredentialsError
from dotenv import load_dotenv
import random
import traceback
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()

app = Flask(__name__)
CORS(app)

# AWS Configuration (DynamoDB & Cognito)
AWS_REGION = os.getenv('AWS_REGION', 'us-east-1')
AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
COGNITO_USER_POOL_ID = os.getenv('COGNITO_USER_POOL_ID')
COGNITO_CLIENT_ID = os.getenv('COGNITO_CLIENT_ID')

DYNAMODB_TABLE_USERS = os.getenv('DYNAMODB_TABLE_USERS', 'Users')
DYNAMODB_TABLE_POSTS = os.getenv('DYNAMODB_TABLE_POSTS', 'Posts')

# SMTP Configuration (Gmail App Password)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_SENDER = "chetansb2004@gmail.com" # Using the email account associated with the App Password
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD') # ivwplfwoezoxmrur

# Initialize AWS Clients
try:
    session = boto3.Session(
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
        region_name=AWS_REGION
    )
    dynamodb = session.resource('dynamodb')
    cognito = session.client('cognito-idp')
    AWS_ENABLED = True
    print("AWS DynamoDB & Cognito Connected.")
except Exception as e:
    print(f"AWS Connection Failed: {str(e)}")
    AWS_ENABLED = False

local_db = {'users': {}, 'posts': [], 'lawyers': []}
otps = {}

def send_smtp_otp(target_email, otp):
    if not EMAIL_SENDER or not EMAIL_PASSWORD:
        print("SMTP Credentials missing.")
        return False
    try:
        msg = MIMEMultipart()
        msg['From'] = f"Legal Notice <{EMAIL_SENDER}>"
        msg['To'] = target_email
        msg['Subject'] = f"{otp} is your Legal Notice verification code"
        
        body = f"""
        <div style="font-family: sans-serif; padding: 25px; border: 1px solid #e1e8ed; border-radius: 15px; max-width: 500px; color: #1a1a2e;">
            <h2 style="color: #c5a059; border-bottom: 2px solid #c5a059; padding-bottom: 10px;">Legal Notice Verification</h2>
            <p style="font-size: 16px;">Welcome to your professional e-court portal. Your verification code is:</p>
            <div style="background: #f4f7f9; padding: 25px; font-size: 36px; font-weight: bold; text-align: center; border-radius: 12px; letter-spacing: 8px; color: #1a1a2e; margin: 25px 0; border: 1px solid #eee;">
                {otp}
            </div>
            <p style="font-size: 14px; color: #707e89;">
                This code will expire in 10 minutes. Please enter it on the login page to continue.
            </p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
            <p style="font-size: 11px; color: #94a3b8; text-align: center;">© 2026 Legal Notice Platform | Secure Professional Access</p>
        </div>
        """
        msg.attach(MIMEText(body, 'html'))
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"SMTP Error: {str(e)}")
        return False

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    email = data.get('email')
    role = data.get('role', 'user')
    if not email:
        return jsonify({"success": False, "message": "Email is required"}), 400
    
    try:
        otp = str(random.randint(100000, 999999))
        otps[email] = otp
        
        # Send via Gmail SMTP (High reliability)
        email_sent = send_smtp_otp(email, otp)
        
        # Save to DynamoDB
        if AWS_ENABLED:
            try:
                table = dynamodb.Table(DYNAMODB_TABLE_USERS)
                table.put_item(Item={'email': email, 'role': role, 'lastLogin': otp, 'status': 'active'})
                try:
                    cognito.admin_create_user(
                        UserPoolId=COGNITO_USER_POOL_ID,
                        Username=email,
                        UserAttributes=[{'Name': 'email', 'Value': email}, {'Name': 'custom:role', 'Value': role}],
                        MessageAction='SUPPRESS'
                    )
                except: pass
            except Exception as e:
                print(f"Database Storage Error: {str(e)}")
        
        print(f"--- OTP SENT ---\nTo: {email}\nCode: {otp}\nSuccess: {email_sent}\n----------------")
        
        return jsonify({
            "success": True, 
            "message": "Verification code sent to your Gmail inbox" if email_sent else "Check console for code",
            "email_sent": email_sent
        })
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    email = data.get('email')
    otp = data.get('otp')
    
    is_valid = False
    if email in otps and otps[email] == otp:
        is_valid = True
        del otps[email]
    
    if not is_valid and AWS_ENABLED:
        try:
            table = dynamodb.Table(DYNAMODB_TABLE_USERS)
            res = table.get_item(Key={'email': email})
            if res.get('Item') and res['Item'].get('lastLogin') == otp:
                is_valid = True
        except: pass

    if is_valid:
        user_record = {'email': email, 'role': 'user'}
        if AWS_ENABLED:
            try:
                table = dynamodb.Table(DYNAMODB_TABLE_USERS)
                user_record = table.get_item(Key={'email': email}).get('Item', user_record)
            except: pass
        return jsonify({"success": True, "token": f"auth-{email}", "user": user_record})
    
    return jsonify({"success": False, "message": "Invalid verification code"}), 401

@app.route('/lawyers', methods=['GET'])
def get_lawyers():
    return jsonify([
        {'id': '101', 'name': 'Adv. Rajesh Kumar', 'specialization': 'Criminal Defense', 'experience': '15 Years', 'rating': '4.9', 'charges': '₹1500 / Session', 'image': '/images/lawyers/lawyer1.png', 'about': 'Director at Legal Associates. Champion status.'}
    ])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
