from flask import Flask, jsonify, request
from read_files import read_md_files
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from firebase_functions import push_data, check_document_exists, check_user_exists

app = Flask(__name__)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["30 per minute"],
    strategy="fixed-window", # or "moving-window"
   #  error code is 429
)

@app.route('/')
@limiter.limit("1 per second")
def hello_world():
    return jsonify("Hi there, you've stumbled across the backend API of Nataraj AI")


@app.route('/blogs')
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
        push_data(user)
        response_model["message"] = "Data Added Successfully!"
     else:
        response_model["message"] = "User with such UID doesn't exist"
  else:
     response_model["message"] = "Data already exists"
  return jsonify(response_model)


@limiter.limit("1 per hour")
@app.route('/contactus', methods=["GET"])
def contactus(uid):
  return jsonify({"dummydata"}), 403


if __name__ == '__main__':
    app.run(debug=True)
