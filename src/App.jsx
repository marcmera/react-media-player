import React, { useRef, useState } from 'react';
import MediaPlayer from './components/MediaPlayer';

function App() {
  const [sourceType, setSourceType] = useState('Video');

  const fileRef = useRef(null);


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function handleFileChange() {
    document.querySelector('p').classList.add('hidden');

    const file = document.getElementById('file').files[0];
    const extension = file.name.split('.').pop().toLowerCase(); // Obtener la extensión del archivo

    if (
      ['mp4', 'webm', 'ogg'].includes(extension) && // Verificar si es un archivo de video
      ['video/mp4', 'video/webm', 'video/ogg'].includes(file.type)
    ) {
      setSourceType('Video');
      sleep(500).then(() => {
        const video = document.getElementById('videoElement');
        if (video) {
          const fileURL = URL.createObjectURL(file);
          video.src = fileURL;
          const play = document.getElementById('play');
          play.click();
        } else {
          console.error('No se encontró elemento de video en el DOM');
        }
      });
    } else if (
      ['mp3', 'wav', 'mpeg'].includes(extension) && // Verificar si es un archivo de audio
      ['audio/mp3', 'audio/wav', 'audio/mpeg'].includes(file.type)
    ) {
      setSourceType('Audio');
      sleep(500).then(() => {
        const audio = document.getElementById('audioElement');
        if (audio) {
          const fileURL = URL.createObjectURL(file);
          audio.src = fileURL;
          const play = document.getElementById('play');
          play.click();
        } else {
          console.error('No se encontró elemento de audio en el DOM');
        }
      });
    } else {
      document.querySelector('p').classList.remove('hidden');
    }
  }

  return (
    <div className="App">
      <h2 className="text-center text-4xl font-bold mt-12 mb-20">Reproductor Multimedia con React y Tailwind</h2>

      <div className=' absolute w-[400px] bottom-36 left-[40%] flex flex-col items center'>
        <p className='text-red-500 text-xl hidden text-center mb-8'>Este tipo de archivo no es soportado</p>
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xl px-5 py-2.5 text-center'
          onClick={() => fileRef.current.click()}
        >
          Seleccionar archivo
        </button>
      </div>

      <input onChange={handleFileChange} className='hidden' ref={fileRef} type="file" name="media" accept="video/*,audio/*" id="file" />
      <MediaPlayer type={sourceType} src='' />
    </div>
  )
}

export default App;
