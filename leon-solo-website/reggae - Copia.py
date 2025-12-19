import asyncio
import os
import simpleaudio as sa
import numpy as np
from google import genai
from google.genai import types
from dotenv import load_dotenv  # Nova biblioteca

# 1. Carrega a chave do arquivo .env
load_dotenv()
GOOGLE_API_KEY = os.getenv("AIzaSyAIUnE-8ujL_zLgcFdM9gLkfAzdXhCRQuQ")

if not GOOGLE_API_KEY:
    print("ERRO: Chave de API não encontrada. Crie um arquivo .env com GOOGLE_API_KEY=sua_chave")
    exit(1)

# 2. Configura o cliente com a chave segura
client = genai.Client(api_key=GOOGLE_API_KEY, http_options={'api_version': 'v1alpha'})

async def main():
    async def receive_and_play_audio(session):
        """Recebe e reproduz os chunks de áudio em tempo real."""
        audio_buffer = []
        play_obj = None

        while True:
            async for message in session.receive():
                if message.server_content and message.server_content.audio_chunks:
                    # Decodifica o áudio PCM de 16-bit, 48kHz, estéreo
                    audio_data = message.server_content.audio_chunks[0].data
                    audio_int16 = np.frombuffer(audio_data, dtype=np.int16)

                    # Reproduz o áudio usando simpleaudio
                    play_obj = sa.play_buffer(audio_int16, num_channels=2, bytes_per_sample=2, sample_rate=48000)
                    audio_buffer.append(play_obj)

            await asyncio.sleep(0.001)

    async with (
        client.aio.live.music.connect(model='models/lyria-realtime-exp') as session,
        asyncio.TaskGroup() as tg,
    ):
        print("🎵 Conectando à sessão de música...")

        # Inicia a tarefa que recebe e toca o áudio
        tg.create_task(receive_and_play_audio(session))

        # Envia o "prompt" musical inicial
        print("🎶 Configurando a vibe: Reggae lento e introspectivo...")
        await session.set_weighted_prompts(
            prompts=[
                types.WeightedPrompt(text='Reggae', weight=1.0),
                types.WeightedPrompt(text='Acoustic Guitar', weight=0.8),
                types.WeightedPrompt(text='Mellow', weight=0.9),
                types.WeightedPrompt(text='Slow Tempo', weight=0.7),
            ]
        )

        # Ajusta parâmetros de geração
        await session.set_music_generation_config(
            config=types.LiveMusicGenerationConfig(
                bpm=70,
                temperature=0.8,
                scale=types.Scale.C_SHARP_MINOR
            )
        )

        # Inicia a geração da música
        print("🔊 Gerando instrumental de reggae...")
        await session.play()

        # Mantém a música tocando por um tempo
        await asyncio.sleep(45)

        # Para a geração suavemente
        print("\n⏹️ Finalizando a geração...")
        await session.stop()

    print("✅ Sessão encerrada. Base instrumental pronta!")

if __name__ == "__main__":
    asyncio.run(main())