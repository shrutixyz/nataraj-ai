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
  text1 = """return timestamp based subtitles for this audio in json, along with suitable dance steps, like if a verse of lyrics is played from 0 seconds, then add it with key "0", and then the next verse according to its start time and so on example- {\"0.00\": {\"lyrics\": \"oh oh\"}, {\"step\", \"flicker hands}}"""

  # text1 = """return timestamp based subtitles for this audio in json, along with suitable dance steps, example- {\"0.00\": {\"lyrics\": \"oh oh\"}, {\"step\", \"flicker hands}}"""

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

# print(generate_dance_with_lyrics("gs://nataraj-ai.appspot.com/uploads/modified-89ee24g.mp3"))

