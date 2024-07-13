import os

def read_md_files(directory):
  """Reads .md files from a directory and returns a dictionary of filename: content pairs."""
  data = {}
  for filename in os.listdir(directory):
    if filename.endswith('.md'):
      with open(os.path.join(directory, filename), 'r') as f:
        content = f.read()
        data[filename] = content
  return data