import soundfile as sf

def trim_audio_soundfile(input_file, start_time, end_time, output_file):
  data, samplerate = sf.read(input_file)
  start_sample = int(start_time * samplerate)
  end_sample = int(end_time * samplerate)
  trimmed_data = data[start_sample:end_sample]
  sf.write(output_file, trimmed_data, samplerate)
