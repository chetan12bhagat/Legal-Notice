import boto3
import os
from botocore.exceptions import ClientError

# Configuration
REGION = 'us-east-1' # Change to your preferred region

def setup_dynamodb():
    print("--- Setting up DynamoDB ---")
    db = boto3.resource('dynamodb', region_name=REGION)
    
    tables = [
        {
            'TableName': 'Users',
            'KeySchema': [{'AttributeName': 'email', 'KeyType': 'HASH'}],
            'AttributeDefinitions': [{'AttributeName': 'email', 'AttributeType': 'S'}]
        },
        {
            'TableName': 'Lawyers',
            'KeySchema': [{'AttributeName': 'id', 'KeyType': 'HASH'}],
            'AttributeDefinitions': [{'AttributeName': 'id', 'AttributeType': 'S'}]
        },
        {
            'TableName': 'Cases',
            'KeySchema': [
                {'AttributeName': 'userId', 'KeyType': 'HASH'},
                {'AttributeName': 'timestamp', 'KeyType': 'RANGE'}
            ],
            'AttributeDefinitions': [
                {'AttributeName': 'userId', 'AttributeType': 'S'},
                {'AttributeName': 'timestamp', 'AttributeType': 'S'}
            ]
        },
        {
            'TableName': 'Posts',
            'KeySchema': [{'AttributeName': 'id', 'KeyType': 'HASH'}],
            'AttributeDefinitions': [{'AttributeName': 'id', 'AttributeType': 'S'}]
        }
    ]

    for table_info in tables:
        try:
            print(f"Creating table {table_info['TableName']}...")
            db.create_table(
                TableName=table_info['TableName'],
                KeySchema=table_info['KeySchema'],
                AttributeDefinitions=table_info['AttributeDefinitions'],
                ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
            )
            print(f"Table {table_info['TableName']} created successfully.")
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceInUseException':
                print(f"Table {table_info['TableName']} already exists.")
            else:
                print(f"Error creating table {table_info['TableName']}: {e}")

def setup_cognito():
    print("\n--- Setting up AWS Cognito ---")
    cognito = boto3.client('cognito-idp', region_name=REGION)
    
    try:
        # Create User Pool
        print("Creating User Pool...")
        pool_response = cognito.create_user_pool(
            PoolName='LegalNoticeUserPool',
            AutoVerifiedAttributes=['email'],
            Schema=[
                {'Name': 'name', 'AttributeDataType': 'String', 'Mutable': True, 'Required': True},
                {'Name': 'email', 'AttributeDataType': 'String', 'Mutable': True, 'Required': True}
            ]
        )
        pool_id = pool_response['UserPool']['Id']
        print(f"User Pool created: {pool_id}")
        
        # Create App Client
        print("Creating App Client...")
        client_response = cognito.create_user_pool_client(
            UserPoolId=pool_id,
            ClientName='LegalNoticeAppClient',
            ExplicitAuthFlows=['ALLOW_USER_PASSWORD_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH', 'ALLOW_CUSTOM_AUTH']
        )
        client_id = client_response['UserPoolClient']['ClientId']
        print(f"App Client created: {client_id}")
        
        return pool_id, client_id
    except ClientError as e:
        print(f"Error setting up Cognito: {e}")
        return None, None

def update_env(pool_id, client_id):
    if not pool_id or not client_id:
        return
        
    env_content = f"""AWS_REGION={REGION}
COGNITO_USER_POOL_ID={pool_id}
COGNITO_CLIENT_ID={client_id}
DYNAMODB_TABLE_LAWYERS=Lawyers
DYNAMODB_TABLE_CASES=Cases
DYNAMODB_TABLE_USERS=Users
"""
    with open('.env', 'w') as f:
        f.write(env_content)
    print("\n.env file has been updated with your new AWS resource IDs.")

if __name__ == "__main__":
    setup_dynamodb()
    pool_id, client_id = setup_cognito()
    update_env(pool_id, client_id)
    print("\n--- SETUP COMPLETE ---")
    print("Your legal notice app is now connected to AWS.")
    print("Run 'pip install -r requirements.txt' and then 'python app.py' to start the backend.")
