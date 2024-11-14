export const playTTS = (word: string) => {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(word);
  // TODO: 값 변경 UI 만들기
  utterThis.lang = "ja";
  utterThis.rate = 0.5;

  synth.speak(utterThis);
};
