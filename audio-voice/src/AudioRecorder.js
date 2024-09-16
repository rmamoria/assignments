import React, { useState, useEffect } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const CustomAudioRecorder = () => {
  const recorderControls = useAudioRecorder();
  const [audioURL, setAudioURL] = useState('');
  const [blob, setBlob] = useState(null); 
  const [isManualStop, setIsManualStop] = useState(false);

  const handleSave = (blob) => {
    setBlob(blob);
    const url = URL.createObjectURL(blob);
    setAudioURL(url); 
  };

  const handleStartRecording = () => {
    setIsManualStop(false);
    recorderControls.startRecording();
  };

  const handleStopRecording = () => {
    setIsManualStop(true);
    recorderControls.stopRecording();
  };

  useEffect(() => {
    let timer;
    if (recorderControls.isRecording && !isManualStop) {
      timer = setTimeout(() => {
        handleStopRecording();
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [recorderControls.isRecording, isManualStop]);

  useEffect(() => {
    if (blob !== null) {
      console.log('Recorded Blob:', blob);
    }
  }, [blob]);

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Audio Recorder</h2>
      <AudioRecorder
        onRecordingComplete={(blob) => handleSave(blob)}
        recorderControls={recorderControls}
        className="mb-12"
      />
      {audioURL && <audio src={audioURL} controls className="mb-4" />}
      <div className="flex  space-x-4 p-4 mt-10">
        <button 
          onClick={handleStartRecording} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Start Recording
        </button>
        <button 
          onClick={handleStopRecording} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default CustomAudioRecorder;
