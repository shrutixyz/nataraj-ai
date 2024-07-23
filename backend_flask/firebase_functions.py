import firebase_admin
from firebase_admin import credentials, firestore, auth
import datetime

# Path to the service account key file
cred = credentials.Certificate('nataraj-admin-key.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()


def push_user_data(user):
    data = {
        "name": user.display_name,
        "email": user.email,
        "avatars": [],
        "ispremium": False,
        "premiumexpiry": None,
        "profilepicture":"https://i.ibb.co/nQhcZSc/pfp.png",
        "projects": []
    }
    doc_ref = db.collection("users").document(user.uid).set(data)
    print(f'Document added, {doc_ref}')


def check_document_exists(collection_name, document_id):
    doc_ref = db.collection(collection_name).document(document_id)
    doc = doc_ref.get()
    if doc.exists:
        print(f'Document with ID {document_id} exists.')
        return True
    else:
        print(f'Document with ID {document_id} does not exist.')
        return False


def check_user_exists(uid):
    try:
        user = auth.get_user(uid)
        print(f'User with UID {uid} exists.')
        return user
    except auth.UserNotFoundError:
        print(f'User with UID {uid} does not exist.')
        return None
    

def push_data_contact_us(email, text):
    now = datetime.datetime.now()  # Get current date and time
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
    data = {
        "email": email,
        "text": text,
        "timestamp": timestamp
    }
    doc_ref = db.collection("contactus").document(timestamp.replace(" ", "-")).set(data)
    print(f'Document added, {doc_ref}')


def delete_account(user_id):
    auth.delete_user(user_id)