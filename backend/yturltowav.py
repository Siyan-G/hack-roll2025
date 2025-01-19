import yt_dlp
import subprocess
import os

def youtube_to_wav(url):
    ydl_opts = {
        'format': 'bestaudio[ext=mp4]/best[ext=mp4]',
        'extractaudio': True,
        'audioquality': 1,
        'outtmpl': 'wav/temp_audio.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
        }],
    }
    
    try: 
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        
        split_wav_file("wav/temp_audio.wav")
    
    except Exception as e:
        print(f"An error has occurred: {e}")
    finally: 
        if os.path.exists("wav/temp_audio.wav"):
            os.remove("wav/temp_audio.wav")
            print("Temporary File 'wav/temp_audio.wav' has been removed.")
        
def split_wav_file(file_path):
    chunk_length = 5 * 60  # 5 minutes in seconds

    # Use ffmpeg to split the audio
    command = [
        "ffmpeg",
        "-i", file_path,
        "-filter:a", f"atempo={1.5}",  # Adjust audio tempo
        "-f", "segment",
        "-segment_time", str(chunk_length),
        "-c:a", "pcm_s16le",  # Re-encode audio to WAV format
        os.path.join("wav", "chunk_%02d.wav")
    ]
    subprocess.run(command, check=True)
    
# Test Code    
url = "https://www.youtube.com/watch?v=2X5XBr19-G0"
youtube_to_wav(url)