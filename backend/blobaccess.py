import os
from azure.storage.blob import BlobServiceClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Replace these with your details
connection_string = os.getenv("AZURE_BLOB_CONNECTION_STRING")
container_name = "hackandroll"
blob_name = "lawrence.mp3"
local_file_path = r"C:\Users\Lenovo\Desktop\test\test.mp3"  # Local path to save the file

# Create BlobServiceClient
blob_service_client = BlobServiceClient.from_connection_string(connection_string)

# Get the container and blob client
container_client = blob_service_client.get_container_client(container_name)
blob_client = container_client.get_blob_client(blob_name)

# Download the blob to a local file
with open(local_file_path, "wb") as local_file:
    download_stream = blob_client.download_blob()
    local_file.write(download_stream.readall())

print("File downloaded successfully!")
