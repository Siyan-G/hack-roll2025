import os
import azure.cognitiveservices.speech as speechsdk
from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
from dotenv import load_dotenv
import tempfile
import time
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

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

    transcriptions, summary = recognize_speech_from_audio_file(audio_file_path)
    os.remove(audio_file_path)

    return jsonify({
        'transcription': ' '.join(transcriptions),
        'summary': summary
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
    # print("Word-level timestamps:", word_timestamps)
    joined = " ".join(transcriptions)
    summary = summarize_text(joined)
    print(summary)
    return transcriptions, summary


tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn", use_fast=True)
model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

# Function to summarize text
def summarize_text(transcription):
    inputs = tokenizer(transcription, return_tensors="pt", truncation=True, max_length=1024)
    summary_ids = model.generate(inputs["input_ids"], max_length=200, min_length=50, do_sample=False)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

# Test
# test = ["Hey housing guys. Alright so in this video I'm going to show you how to transcribe beats to text from a secific microphone using Address Speech API in Python. So this is actually a video that I get a lot of requests from patreons and members and from a few subscribers and to be honest trying to figure how to select A microphone.", 'And stream the text to speech using address API. It should took me a day to figure out.', "Alright, so let's do this. First, I'm going to add a speech service to my resource group. If I have a new user, simply create a new address account and it's free. They want to create subscription. So in the search field, simply navigate to subscription and provide your credit card information.", 'Then you want to create a resource group.', 'So simply search for resource groups.', "And I'll create a resource group and for this demo I'm going to use my development resource group.", 'Right, so here click on create.', 'I want to ask beach.', 'Service to the resource group.', 'It should be the first item, so click on Create in Speech.', "Now here, simply give the instance a name. I'll name the instance test 1.", 'And for the present here choose the free tier, then click on Review and create.', "In a sync, my instant name is duplicated. Let me go back and I'll change the instance name to test 123.", "What's going on here?", "Right, so let's do test X123 and see what happens.", 'OK, so looks like the name is valid. Then you can click on create to create the service.', 'And once the deployment is complete, click on Go to Resource.', "Now here, let's go ahead and create a blank Python script.", 'Now to use a specific microphone on Windows, you want to go to Device Manager.', "And I'm not sure if I'm Mac OS, you might need to figure out how to get the device ID, but on Windows I can simply go to device manager, then I need to navigate to audio inputs and outputs.", "Now make sure that you choose a microphone's input, and I'm using a third party microphone. So which is this one right here and here. I'm going to right click on the microphone device, then I'm going to click on Properties, then go to Details tab.", "From the drop down here you want to choose device instant path and here I'm going to copy the value here.", "And I'll copy paste to my script.", "I'm going to remove the 1st 2 components and that leaves me the device ID.", 'And when we use address speech to text, speech, text speech, yeah yeah, speech to text API. And if you want to use a specific microphone, we need to provide the device ID.', 'Now I want to create an environment variables or you can directly create the environment variables on your C Now in my environment variables file I created 2 variables API key and region. The API key is going to come in from the speech API key.', 'And the reason is going to be location where the instance is located.', 'Now for the trip command to install the required Python libraries, there are two libraries that we need to install. The first one is going to be Python dot EMV and the other library is going to be Azure cognitive.', 'Services Dash Speech Hit enter.', 'Server type on the services.', 'All right, so once you install the libraries we can dive into the Python script.', "Let's go ahead and import the OS module and found that env. We're going to import the load env function.", "Information Services dot speech. I'm going to name this as Speech SDK.", "Then I'm going to create a function called speak to microphone and the function takes 2 parameters, API key and region.", "Inside the function I'm going to create a speech config object and I'll provide the API key and region and it's going to be our connection to the API. Then I'm going to set the speech recognition language to English.", "Next I'm going to configure my device using Speech SDK Audio Audioconfig. Now for the device name, this is going to be the device ID which is going to be the ID that I copy right here.", "They'll need to create a speech recognizer object and provide the speech configuration setting on the speech config object.", 'In the audio setting from the audio config object.', 'Now, because the default turn out duration is actually relative short, as soon as like 5 seconds inform to increase the 10 mile duration, we can reference speech recognize that properties that set property.', "And found Speech SDK dot property ID Speech Service connection. For the initial silence timeout I'm going to set that to 60 seconds and for the inscience Thermo I'm going to set that to 20 seconds.", "And here I'm going to insert a RINT statement speak into your microphone, say start session to end O. The keyword start session is going to stop the program.", "Now to stream the audio to speech or to text, we're going to insert a while loop to keep the process running. Now using speech recognizer dot recognize once a sync dot get. So this function is going to wait any audio signals.", "Then we're going to insert 3 if statements to check if there's any speech that is detached.", "Then we're going to print recognize file by the text from the audio. Now if the speech contains the text, stop session.", "Then we're going to terminate the program. Otherwise, we're going to check the other two conditions. If the audio or speech is not available speech, then we're going to use the no match condition. Then print the message no speech could be recognized followed by the no match details text. Now if the reason is cancelled, this can be if you press the shortcut to stop the program.", "So if you integrate the API with a web application or you can implement your own specific operation to run the cancel operation or method to trigger this condition. Inside this if block I'm going to print the cancellation details followed by the error details.", 'And to use the function.', "So this is going to be the entry point. First we need to load the API key and the region. Then we're going to run the speak to microphone function.", "And we'll provide the API key in region and that's it. And for testing I'm going to run the script.", 'Oh, I forgot to load the environment variables.', "All right, let me try again. So for the beginning, we're going to see the message speak into your microphone, say start session to end.", "Now as you can see that as I speak more text is going to get dislayed in my terminal. Now I'm going to stop the program by saying stop session.", "And I'll terminate the session, right? So this is going to be Epsilon going to cover in this tutorial and hope you guys find these videos for if you find this videos for please don't forget to like the video and subscribe to the channel and also you guys in the next video."]
# inputs = " ".join(test)
# out = summarize_text(inputs)
# print(out)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)