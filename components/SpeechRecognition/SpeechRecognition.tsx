import * as React from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {IconMicrophone} from '@tabler/icons-react'

interface SpeechRecognitionProps {
  setSourceText: React.Dispatch<React.SetStateAction<string>>
}
const SpeechRecognitionComponent = ({setSourceText}:SpeechRecognitionProps) => {

  const {transcript, listening} = useSpeechRecognition()

  React.useEffect(() => {
    setSourceText(transcript)

  })
  ,
  [transcript, setSourceText]


  const handleVoiceRecordings = () => {
    if (listening) {
        SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening()
    }
  }


  return (
    <div>
    <IconMicrophone
    size={22}
    className='text-gray-400'
    onClick={handleVoiceRecordings}
    />
    </div>
  )
}

export default SpeechRecognitionComponent