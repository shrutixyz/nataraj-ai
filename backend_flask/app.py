from flask import Flask, jsonify
from read_files import read_md_files

app = Flask(__name__)

@app.route('/')
def hello_world():
    """Returns a JSON response containing the content of all .md files in the static/blogs directory."""
    return "Hi there, you've stumbled across the backend API of Nataraj AI"

@app.route('/blogs')
def get_blogs():
  """Returns a JSON response containing the content of all .md files in the static/blogs directory."""
  blog_data = read_md_files('static/blogs')
  return jsonify(blog_data)

if __name__ == '__main__':
    app.run(debug=True)
