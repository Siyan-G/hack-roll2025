import os
import azure.cognitiveservices.speech as speechsdk
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import tempfile
import time

# Initialize Flask app
app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Get Azure credentials from environment
speech_key = os.getenv("AZURE_SPEECH_KEY")
service_region = os.getenv("AZURE_REGION")

# Define API route for transcribing audio files
@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    """
    Endpoint to transcribe audio from a file sent in the POST request.
    """
    # Ensure audio file is included in the request
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']

    # Create a temporary file to store the uploaded audio
    with tempfile.NamedTemporaryFile(delete=False) as temp_audio_file:
        temp_audio_file.write(audio_file.read())
        temp_audio_file.close()
        audio_file_path = temp_audio_file.name

    # Perform transcription
    transcriptions = recognize_speech_from_audio_file(audio_file_path)

    # Delete the temporary file after processing
    os.remove(audio_file_path)

    return jsonify({
        'transcription': ' '.join(transcriptions)
    }), 200


def recognize_speech_from_audio_file(audio_file_path):
    """
    Perform continuous speech recognition from an audio file.
    """
    # Configure the speech recognizer
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
    audio_config = speechsdk.audio.AudioConfig(filename=audio_file_path)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    print(f"Processing audio file: {audio_file_path}")
    done = False
    transcriptions = ["result"]

    # Event handlers for recognizing and recognized speech
    def recognizing_cb(evt):
        print(f"RECOGNIZING: {evt.result.text}")

    def recognized_cb(evt):
        print(f"RECOGNIZED: {evt.result.text}")
        if evt.result.reason == speechsdk.ResultReason.RecognizedSpeech:
            transcriptions.append(evt.result.text)

    def session_stopped_cb(evt):
        global done
        done = True
        print("flag set to true")
        print("Session stopped.")
        

    # Attach event handlers
    speech_recognizer.recognizing.connect(recognizing_cb)
    speech_recognizer.recognized.connect(recognized_cb)
    speech_recognizer.session_stopped.connect(session_stopped_cb)

    # Start continuous recognition
    speech_recognizer.start_continuous_recognition()

    # Wait for the audio file processing to complete
    while done == 'False':
        print("done: ", done)
        print("Waiting for recognition to complete...")
        time.sleep(0.1)  # Adding a slight delay to avoid high CPU usage

    # Once recognition is complete, stop continuous recognition
    speech_recognizer.stop_continuous_recognition()

    # Return the transcription result after process finishes
    print("Transcription completed", transcriptions)
    return transcriptions


if __name__ == "__main__":
    # Run the Flask app
    app.run(debug=True, host="0.0.0.0", port=5000)
