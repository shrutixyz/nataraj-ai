import base64
import vertexai
from vertexai.generative_models import GenerativeModel, Part, FinishReason
import vertexai.preview.generative_models as generative_models

def generate_dance_with_lyrics(file):
  audio1 = Part.from_uri(
  uri=file,
    mime_type="audio/mpeg",
  )
  text1 = """return timestamp based subtitles for this audio in json, along with suitable dance steps, example- {\"0.00\": {\"lyrics\": \"oh oh\"}, {\"step\", \"flicker hands}}"""

  generation_config = {
      "max_output_tokens": 8192,
      "temperature": 1,
      "top_p": 0.95,
  }
  vertexai.init(project="singular-node-429217-j4", location="us-central1")
  model = GenerativeModel(
    "gemini-1.5-flash-001",
  )
  responses = model.generate_content(
      [audio1, text1],
      generation_config=generation_config,
    #   safety_settings=safety_settings,
      stream=True,
  )
  final_response = ""
  for response in responses:
    # print(response.text, end="")
    final_response += response.text

  return final_response

# print(generate("gs://nataraj-ai.appspot.com/uploads/modified-zayn.mp3"))

