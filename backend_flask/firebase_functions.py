import firebase_admin
from firebase_admin import credentials, firestore, auth, db
import datetime
from google.cloud import storage


# Path to the service account key file
cred = credentials.Certificate('nataraj-admin-key.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {'databaseURL': 'https://nataraj-ai-default-rtdb.firebaseio.com/'})

# Initialize Firestore
firestore_db = firestore.client()
storage_client = storage.Client.from_service_account_json('nataraj-admin-key.json')

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
    doc_ref = firestore_db.collection("users").document(user.uid).set(data)
    print(f'Document added, {doc_ref}')


def check_document_exists(collection_name, document_id):
    doc_ref = firestore_db.collection(collection_name).document(document_id)
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
    doc_ref = firestore_db.collection("contactus").document(timestamp.replace(" ", "-")).set(data)
    print(f'Document added, {doc_ref}')


def delete_user_account(user_id):
    auth.delete_user(user_id)
    # deleting user data 
    doc_ref = firestore_db.collection('users').document(user_id)
    doc_ref.delete()



def create_document_rtdb(doc_id, data):
    # Get a reference to the database
    ref = db.reference('projects')
    # Set the data at the specified document ID
    ref.child(doc_id).set(data)
    print(f'Document created with ID: {doc_id}')



def upload_music(uid, file):
    print("uploaded")


def update_document_rtdb(doc_id, data):
    # Get a reference to the database
    ref = db.reference('projects/'+str(doc_id))
    # Update the data at the specified document ID
    ref.update(data)
    print(f'Document with ID {doc_id} updated successfully.')


def append_to_firestore(uid, projectID):
    get_projects = firestore_db.collection("users").document(uid).get().to_dict()["projects"]
    get_projects.append(projectID)
    doc_ref = firestore_db.collection("users").document(uid).update({"projects": get_projects})



def upload_blob(source_file_name, destname):
    bucket_name="nataraj-ai.appspot.com"
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(f'uploads/{destname}')
    blob.upload_from_filename(source_file_name)
    blob.make_public()
    url = blob.public_url
    print(f'File {source_file_name} uploaded to {destname}.')
    return url


def get_url_from_projectid(projectID):
    ref = db.reference('projects/'+str(projectID))
    print(ref)
    # Update the data at the specified document ID
    url = ref.get('song')
    print(url)
    return url


def get_project_ids_from_uid(uid):
    get_projects = firestore_db.collection("users").document(uid).get().to_dict()["projects"]
    projects = []
    print(get_projects)
    for project in get_projects:
        ref = db.reference('projects/'+str(project)).get()
        projects.append(ref)
    print(projects)
    return projects


def change_visibility_rtdb(pid, visibility):
    ref = db.reference('projects/'+str(pid)).update({"visibility": visibility})
    return True

def delete_project_rtdb(pid):
    owner = db.reference('projects/'+str(pid)).get()["owner"]
    print(owner)
    get_projects = firestore_db.collection("users").document(owner).get().to_dict()["projects"]
    get_projects.remove(pid)
    doc_ref = firestore_db.collection("users").document(owner).update({"projects": get_projects})
    ref = db.reference('projects/'+str(pid)).delete()
    return True