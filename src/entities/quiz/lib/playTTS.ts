export const playTTS = (word: string) => {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(word);
  utterThis.lang = "ja";

  synth.speak(utterThis);
};
