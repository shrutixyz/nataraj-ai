import base64
import vertexai
from vertexai.generative_models import GenerativeModel, Part, FinishReason
import os


def generate_dance_with_lyrics(file):
  os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="vertex-key.json"
  vertexai.init(project="singular-node-429217-j4", location="us-central1")
  audio1 = Part.from_uri(
  uri=file,
    mime_type="audio/mpeg",
  )
  # text1 = "tell the size of this file"
  text1 = """return timestamp based subtitles for this audio in json, along with suitable dance steps, example- {\"0.00\": {\"lyrics\": \"oh oh\"}, {\"step\", \"flicker hands}}"""

  model = GenerativeModel(
    "gemini-1.5-flash-001",
  )
  generation_config = {
      "max_output_tokens": 4000,
      "temperature": 1,
      "top_p": 0.95,
  }
  
  responses = model.generate_content(
      [audio1, text1],
      generation_config=generation_config,
      stream=True,
      #  add_sleep_after_page = True,
  )
  print("7")
  final_response = ""
  for response in responses:
    print(response.text, end="")
    final_response+=response.text

  return final_response

# print(generate_dance_with_lyrics("gs://nataraj-ai.appspot.com/uploads/modified-Palm%20Skies%20%26%20DEAN%20-%20Will%20You%20Come%20%28Feat.%20Reuben%20Cameron%29%20%5BNCS%20Release%5D.mp3"))

