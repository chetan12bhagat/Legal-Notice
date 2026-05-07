import boto3
import os
from dotenv import load_dotenv

load_dotenv()

def test_ses():
    session = boto3.Session(
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_REGION', 'us-east-1')
    )
    ses = session.client('ses')
    sender = os.getenv('EMAIL_SENDER')
    
    print(f"Testing SES from: {sender}")
    
    try:
        response = ses.send_email(
            Source=sender,
            Destination={'ToAddresses': [sender]},
            Message={
                'Subject': {'Data': 'SES Connectivity Test'},
                'Body': {'Text': {'Data': 'If you see this, your AWS SES is working perfectly!'}}
            }
        )
        print(f"Success! Message ID: {response['MessageId']}")
    except Exception as e:
        print(f"Failed: {str(e)}")

if __name__ == "__main__":
    test_ses()
