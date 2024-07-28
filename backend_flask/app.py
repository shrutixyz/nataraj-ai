from flask import Flask, jsonify, request
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
   #  error code is 429
)

UPLOAD_FOLDER = os.path.join(app.static_folder, 'musicfiles')

@app.route('/')
@limiter.limit("1 per second")
def hello_world():
    return jsonify("Hi there, you've stumbled across the backend API of Nataraj AI")


@app.route('/blogs')
@limiter.limit("1 per second")
def get_blogs():
  """Returns a JSON response containing the content of all .md files in the static/blogs directory."""
  blog_data = read_md_files('static/blogs')
  return jsonify(blog_data)


@app.route('/createuserdata/<uid>')
def create_user_data(uid):
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
  email = request.json["email"]
  text = request.json["text"]
  push_data_contact_us(email, text)
  return jsonify({"success": True}), 200


@app.route('/deleteaccount/<uid>', methods=['GET'])
def delete_account(uid):
    try:
        delete_user_account(uid)
        return jsonify({'message': 'Account deleted successfully'}), 200
    except Exception as e:
        print(f"Error deleting account: {e}")
        return jsonify({'error': str(e)}), 400
    

@app.route('/createproject', methods=['POST'])
@limiter.limit("90 per 1 minute")
def create_project():
   if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 401
   file = request.files['file']
   filepath = os.path.join(UPLOAD_FOLDER, file.filename)
   outputpath = os.path.join(UPLOAD_FOLDER, "modified-"+file.filename)
   # return {"start": request.form.get('start')}
   file.save(filepath)
   trim_audio_soundfile(filepath, int(request.form.get("start")), int(request.form.get("end")), outputpath)
   url = upload_blob(outputpath, "modified-"+file.filename)
   # print("here")
   data = {
      "owner": request.form.get("uid"),
      "visibility": "private",
      "title": request.form.get("title"),
      "song": url,
      "avatar": "",
      "duration": int(request.form.get("end")) - int(request.form.get("start")),
      "choreography": {},
      "state": 1,
      "loading": 0,
   }
   length_of_randstring = 15 - len("nataraj-")
   randstring = ''.join(random.choices(string.ascii_lowercase + string.digits, k=length_of_randstring))
   create_document_rtdb(f"nataraj-{randstring}", data)
   append_to_firestore(request.form.get("uid"), f"nataraj-{randstring}")
   return {"success": True, "projectID": f"nataraj-{randstring}"}, 200


@app.route('/updatedanceform', methods=["POST"])
@limiter.limit("1 per 1 minute")
def update_dance_form():
   projectid = request.json["projectID"]
   danceform = request.json["danceform"]
   update_document_rtdb(projectid, {"danceform": danceform, "state": 2})
   return {"success": True}, 200


@app.route('/generatedance', methods=["POST"])
@limiter.limit("10 per 1 minute")
def generate_dance():
   projectid = request.json["projectID"]
   # get timestamp based lyrics on backend, save that in project,
   # generate prompt, and add a loading state in backend with a listener on react
   # if response is returned, then show project to user
   print("here")
   url = get_url_from_projectid(projectid)[0]["song"]
   dance_steps = generate_dance_with_lyrics(url)
   return {"success": True, "url": url}
    

@app.route('/upload', methods=['POST'])
def upload_file():
   if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
   file = request.files['file']

   if file.filename == '':
        return jsonify({'error': 'No selected file'})
   
   return {"hhe": file.filename}

if __name__ == '__main__':
   app.run(host='0.0.0.0', port=5000, debug=True)
