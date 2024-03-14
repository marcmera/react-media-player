import React, { useRef, useState } from 'react';
import SoundBar from './SoundBar';

export default function VideoMediaPlayer({ type, src }) {
    const mediaRef = useRef(null); // Ref para acceder al elemento de audio o video
    const [volume, setVolume] = useState(1); // Estado para manejar el volumen

    // Función para reproducir el medio
    const play = () => {
        mediaRef.current.play();
        const soundBar = document.getElementById('soundbar');
        if (soundBar && soundBar.classList.contains('hidden')) {
            soundBar.classList.remove('hidden');
        }
    };

    // Función para pausar el medio
    const pause = () => {
        mediaRef.current.pause();
        const soundBar = document.getElementById('soundbar');
        if (soundBar && !soundBar.classList.contains('hidden')) {
            soundBar.classList.add('hidden');
        }
    };

    // Función para detener el medio (pausar y reiniciar tiempo)
    const stop = () => {
        mediaRef.current.pause();
        mediaRef.current.currentTime = 0;
        const soundBar = document.getElementById('soundbar');
        if (soundBar && !soundBar.classList.contains('hidden')) {
            soundBar.classList.add('hidden');
        }
    };

    // Función para cambiar el volumen
    const changeVolume = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        mediaRef.current.volume = newVolume;
    };

    // Renderizado condicional basado en el tipo de medio
    return (
        <div className="p-4 flex text-center flex-col justify-center items-center">
            {type === 'Video' ? (
                <video
                    id="videoElement"
                    ref={mediaRef}
                    className="w-[100%] h-[600px] mx-auto -mt-14"
                    controls={false}
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div>
                    <div id="soundbar" className="mt-16 hidden">
                        <SoundBar />
                    </div>
                    <audio id="audioElement" ref={mediaRef} controls={false}>
                        <source src={src} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
            {/* Controles para reproducir, pausar, y detener el medio */}
            <div className="flex justify-around items-center bg-black w-1/4 py-1 px-3 absolute bottom-12 rounded-full">
                <div className="flex justify-center space-x-2 my-2">
                    <button id="play" onClick={play} className="">
                        <span className="material-symbols-outlined text-white text-4xl">play_arrow</span>
                    </button>
                    <button id="pause" onClick={pause} className="">
                        <span className="material-symbols-outlined text-white text-4xl">pause</span>
                    </button>
                    <button id="stop" onClick={stop} className="">
                        <span className="material-symbols-outlined text-white text-4xl">stop_circle</span>
                    </button>
                </div>
                {/* Control deslizante para el volumen */}
                <div className="flex justify-center items-center space-x-2">
                    <label htmlFor="volume" className="text-white text-2xl -mt-2">
                        <span className="material-symbols-outlined text-4xl mt-2">volume_up</span>
                    </label>
                    <input
                        id="volume"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={changeVolume}
                        className="w-full max-w-xs"
                    />
                </div>
            </div>
        </div>
    );
};
