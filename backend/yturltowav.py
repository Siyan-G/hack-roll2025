import yt_dlp
import ffmpeg
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
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        try:
            source_file = "wav/temp_audio.mp4"
            # Convert mp4 to wav
            stream = ffmpeg.input("wav/temp_audio.mp4")
            stream = ffmpeg.output(stream, "wav/output.wav")
            
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            if os.path.exists("wav/temp_audio.mp4"):
                os.remove("wav/temp_audio.mp4")
            
# Test Code    
url = "https://www.youtube.com/watch?v=2X5XBr19-G0"
youtube_to_wav(url)