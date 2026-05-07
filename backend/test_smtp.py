import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_SENDER = os.getenv('EMAIL_SENDER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

def test_email():
    print(f"Testing email from: {EMAIL_SENDER}")
    print(f"Using password: {'*' * len(EMAIL_PASSWORD) if EMAIL_PASSWORD else 'MISSING'}")
    
    try:
        msg = MIMEText("This is a test email from Legal Notice.")
        msg['Subject'] = "Test OTP"
        msg['From'] = EMAIL_SENDER
        msg['To'] = EMAIL_SENDER
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.send_message(msg)
        print("Success! Email sent.")
    except Exception as e:
        print(f"Failed: {str(e)}")

if __name__ == "__main__":
    test_email()
