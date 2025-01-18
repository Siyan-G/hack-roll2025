import React, { useState } from "react";

const AudioTranscription = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  // Handle file submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!audioFile) {
      alert("Please select an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      setLoading(true);
      setError(null);

      // Send the audio file to the Flask API
      const response = await fetch("http://localhost:5000/transcribe", {
        method: "POST",
        body: formData,
      });

      // Log the full response object for debugging
      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to transcribe audio.");
      }

      const data = await response.json();

      // Log the response data for debugging
      console.log("Transcription Data:", data);

      // Set the transcription result
      setTranscription(data.transcription);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <h1>Audio Transcription</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="audioFileInput"
          accept="audio/*"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Transcribing..." : "Submit"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {transcription && (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default AudioTranscription;
