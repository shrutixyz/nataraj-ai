import base64
import vertexai
from vertexai.generative_models import GenerativeModel, Part, FinishReason
import os



dance_steps = """
1: Hooting - 2.25s
2: Maraschino step  - 3.01s
3: Flare - 0.30s
4: Right turn - 0.22s
5: Body Swing left right - 4.12s
6: Body Swing front back- 6.07s
7: Turn left - 1.06s
8: Jump - 2.17s
9: Looking - 4.0s
10: back walk - 1.00s
11: right hand swing - 3.10s
12: Rumba Dance - 2.10s
13: Salsa Dance - 2.10s
14: shuffle move - 7.0s
15: Chicken dance - 3.17s
16: Shake it off step - 5.10s
17: Hip Hop walk - 0.29s
18: Walking - 0.29s
19: Wave hands- 1.04s
20: head nod - 2.08s
21: Kick and move right/left - 2.02
22: Dancing handstand - 4.80
23: Dribble - 5.30
24: Catwalk - 1.05
25: Happy jump - 1.27
26: Pointing backwards with finger - 3.15
27: Bow down and greet - 3.00
28: Robotic breakdance move - 15.40
29: Hop back - 5.10
"""

def generate_dance_with_lyrics(file):
  os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="vertex-key.json"
  vertexai.init(project="singular-node-429217-j4", location="us-central1")
  audio1 = Part.from_uri(
  uri=file,
    mime_type="audio/mpeg",
  )
  # text1 = "tell the size of this file"
  text1 = f'return timestamp based subtitles for this audio in JSON, along with suitable dance steps selected from {dance_steps} which have their index and duration mentioned. For example, if a verse of lyrics is played from 0 seconds, then add it with the key "0.00", and then the next verse according to its start time, and so on. Example: {{"0.00": {{"steps": "x (select the best matching step in integer)", "lyrics": "oh oh"}}}}'

  # text1 = """return timestamp based subtitles for this audio in json, along with suitable dance steps, example- {\"0.00\": {\"lyrics\": \"oh oh\"}, {\"step\", \"flicker hands}}"""

  model = GenerativeModel(
    "gemini-1.5-flash-001",
  )
  generation_config = {
      "max_output_tokens": 8000,
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



def get_suggestion_gemini():
  os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="vertex-key.json"
  vertexai.init(project="singular-node-429217-j4", location="us-central1")

  text1 = """give a unique suggestion for performing better at dance within 20 words"""

  model = GenerativeModel(
    "gemini-1.5-flash-001",
  )
  generation_config = {
      "max_output_tokens": 400,
      "temperature": 1,
      "top_p": 0.95,
  }
  
  responses = model.generate_content(
      [text1],
      generation_config=generation_config,
      stream=True,
      #  add_sleep_after_page = True,
  )
  final_response = ""
  for response in responses:
    print(response.text, end="")
    final_response+=response.text

  return final_response


# generate_dance_with_lyrics("gs://nataraj-ai.appspot.com/uploads/modified-89ee24g.mp3")
