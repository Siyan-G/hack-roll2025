import os
import azure.cognitiveservices.speech as speechsdk
from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
from dotenv import load_dotenv
import tempfile
import time

app = Flask(__name__)
# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

load_dotenv()

speech_key = os.getenv("AZURE_SPEECH_KEY")
service_region = os.getenv("AZURE_REGION")

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']

    with tempfile.NamedTemporaryFile(delete=False) as temp_audio_file:
        temp_audio_file.write(audio_file.read())
        temp_audio_file.close()
        audio_file_path = temp_audio_file.name

    transcriptions = recognize_speech_from_audio_file(audio_file_path)
    os.remove(audio_file_path)

    return jsonify({
        'transcription': ' '.join(transcriptions)
    }), 200

def recognize_speech_from_audio_file(audio_file_path):
    """
    Perform continuous speech recognition from an audio file.
    """
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
    audio_config = speechsdk.audio.AudioConfig(filename=audio_file_path)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    print(f"Processing audio file: {audio_file_path}")
    
    # Use list to store the done flag so it can be modified in the callback
    done = [False]
    transcriptions = []

    def recognizing_cb(evt):
        print(f"RECOGNIZING: {evt.result.text}")

    def recognized_cb(evt):
        print(f"RECOGNIZED: {evt.result.text}")
        if evt.result.reason == speechsdk.ResultReason.RecognizedSpeech:
            transcriptions.append(evt.result.text)

    def session_stopped_cb(evt):
        print("Session stopped.")
        done[0] = True  # Modify the list element instead of the variable

    def canceled_cb(evt):
        print(f"CANCELED: {evt.result.reason}")
        if evt.result.reason == speechsdk.CancellationReason.Error:
            print(f"CANCELED: {evt.result.error_details}")
        done[0] = True

    # Attach event handlers
    speech_recognizer.recognizing.connect(recognizing_cb)
    speech_recognizer.recognized.connect(recognized_cb)
    speech_recognizer.session_stopped.connect(session_stopped_cb)
    speech_recognizer.canceled.connect(canceled_cb)
    speech_recognizer.session_started.connect(lambda evt: print("Session started"))

    # Start continuous recognition
    speech_recognizer.start_continuous_recognition()

    # Wait for recognition to complete
    while not done[0]:
        time.sleep(0.1)  # Small sleep to prevent high CPU usage
    
    # Stop recognition
    speech_recognizer.stop_continuous_recognition()

    print("Transcription completed:", transcriptions)
    return transcriptions

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)