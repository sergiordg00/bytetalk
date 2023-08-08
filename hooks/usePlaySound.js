export default function usePlaySound() {
  function getSound(typeOfSound) {
    switch (typeOfSound) {
    case 'messageSent':
      return "/sounds/messagesent.mp3";
    case 'messageReceivedSameChat':
      return "/sounds/messagereceivedsame.mp3";
    case 'messageReceivedDifferentChat':
      return "/sounds/messagereceiveddifferent.mp3";
    default:
      return "";
    }
  }

  function play(typeOfSound) {
    const soundToPlay = getSound(typeOfSound);
    const audio = new Audio(soundToPlay);
  
    audio.play();
  }

  const sounds = {
    messageSent: () => play('messageSent'),
    messageReceivedSameChat: () => play('messageReceivedSameChat'),
    messageReceivedDifferentChat: () => play('messageReceivedDifferentChat'),
  };

  return sounds;
}