from flask import Flask, jsonify, request, render_template
from read_files import read_md_files
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from firebase_functions import *
from flask_cors import CORS, cross_origin
import random
import string
import os
from file_manipulation import *
from gemini_api import *

app = Flask(__name__)

CORS(app)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["30 per minute"],
    strategy="fixed-window", # or "moving-window"
   #  error code is 429 for timeout
)

UPLOAD_FOLDER = os.path.join(app.static_folder, 'musicfiles')

@app.route('/')
@limiter.limit("1 per second")
def hello_world():
    """Returns a HTML Page with all the documentation of the API"""
    return render_template("index.html")


@app.route('/blogs')
@limiter.limit("1 per second")
def get_blogs():
  """Returns a JSON response containing the content of all .md files in the static/blogs directory."""
  blog_data = read_md_files('static/blogs')
  return jsonify(blog_data)


@app.route('/createuserdata/<uid>')
@limiter.limit("1 per 20 second")
def create_user_data(uid):
  """Creates a user with default value on the firestore database"""
  response_model = {"success": False, "message": "NA"}
  doc_exists = check_document_exists("users", uid)
  if not doc_exists:
     user = check_user_exists(uid)
     response_model["success"] = True
     if user!=None:
        push_user_data(user)
        response_model["message"] = "Data Added Successfully!"
     else:
        response_model["message"] = "User with such UID doesn't exist"
  else:
     response_model["message"] = "Data already exists"
  return jsonify(response_model)


@app.route('/contactus', methods=["POST"])
@limiter.limit("1 per 60 minute")
def contactus():
  """Sends a contact request to the admin and pushes the data in firestore"""
  email = request.json["email"]
  text = request.json["text"]
  push_data_contact_us(email, text)
  return jsonify({"success": True}), 200


@app.route('/fetchprojects/<uid>', methods=["GET"])
@limiter.limit("60 per 60 minute")
def fetch_projects(uid):
  """fetches all the projects associated with a user and sends them as an array of JSON"""
  projects = get_project_ids_from_uid(uid)
  return {"success": True, "projects":projects}

@app.route('/fetchproject/<id>', methods=["GET"])
@limiter.limit("60 per 60 minute")
def fetch_project(id):
  """fetches project with given id"""
  project = get_project_from_id(id)
  return {"success": True, "project":project}


@app.route('/changeprojectvisibility/<pid>/<visibility>', methods=["GET"])
@limiter.limit("60 per 30 minute")
def change_visibility(pid, visibility):
  """Changes the visibility of a project based on user needs"""
  status = change_visibility_rtdb(pid, visibility)
  return {"success": status}


@app.route('/deleteproject/<pid>', methods=["GET"])
@limiter.limit("60 per 30 minute")
def delete_project(pid):
  """Deletes a project from the database forever"""
  status = delete_project_rtdb("nataraj-"+pid)
  return {"success": status}


@app.route('/deleteaccount/<uid>', methods=['GET'])
@limiter.limit("1 per 30 minute")
def delete_account(uid):
    """Deletes the user account along with their data"""
    try:
        delete_user_account(uid)
        return jsonify({'message': 'Account deleted successfully'}), 200
    except Exception as e:
        print(f"Error deleting account: {e}")
        return jsonify({'error': str(e)}), 400
    

@app.route('/createproject', methods=['POST'])
@limiter.limit("10 per 5 minute")
def create_project():
   """Creates a new project associated with the user in the RTDB database and link it with the user in firestore database"""
   if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 401
   file = request.files['file']
   length_of_randstring = 15 - len("nataraj-")
   randstring = ''.join(random.choices(string.ascii_lowercase + string.digits, k=length_of_randstring))
   
   filepath = os.path.join(UPLOAD_FOLDER, file.filename)
   outputpath = os.path.join(UPLOAD_FOLDER, f"modified-{str(randstring)}.{str(file.filename.split('.')[-1])}")
   start = int(request.form.get("start"))/1000
   end = int(request.form.get("end"))/1000
   # return {"start": request.form.get('start')}
   file.save(filepath)
   trim_audio_soundfile(filepath, start, end, outputpath)
   url = upload_blob(outputpath, f"modified-{str(randstring)}.{str(file.filename.split('.')[-1])}")

   data = {
      "owner": request.form.get("uid"),
      "visibility": "private",
      "title": request.form.get("title"),
      "song": url,
      "avatar": "",
      "duration": end - start,
      "choreography": {},
      "state": 1,
      "loading": 0,
      "projectID": randstring,
      "projectName": request.form.get("projectName")
   }
   create_document_rtdb(f"nataraj-{randstring}", data)
   append_to_firestore(request.form.get("uid"), f"nataraj-{randstring}")
   return {"success": True, "projectID": f"nataraj-{randstring}"}, 200


@app.route('/updatedanceform', methods=["POST"])
@limiter.limit("30 per 1 minute")
def update_dance_form():
   """update the danceform field of the project json in RTDB database"""
   projectid = request.json["projectID"]
   danceform = request.json["danceform"]
   update_document_rtdb(projectid, {"danceform": danceform, "state": 2})
   return {"success": True}, 200


@app.route('/generatedance', methods=["POST"])
@limiter.limit("2 per 1 minute")
def generate_dance():
   """Generates the dance steps along with the synced lyrics with the help of Gemini Vertex APIs and stores them appropriately"""
   projectid = request.json["projectID"]
   print(projectid)
   print("here")
   url = get_url_from_projectid(projectid)[0]["song"]
   print(f"URLLL IS {url}")
   url = url.replace("https://storage.googleapis.com/nataraj-ai.appspot.com", "gs://nataraj-ai.appspot.com")
   dance_steps = generate_dance_with_lyrics(url)
   update_document_rtdb(projectid, {"choreography": dance_steps})
   return {"success": True, "url": url}


@app.route('/getsuggestion', methods=["GET"])
@limiter.limit("2 per 1 second")
def get_suggestion():
   """Generates the dance suggestion using Gemini API to show to the user on mobile application"""
   suggestion = get_suggestion_gemini()
   return {"success": True, "suggestion": suggestion}
    


if __name__ == '__main__':
   app.run(port=5000, debug=False)
