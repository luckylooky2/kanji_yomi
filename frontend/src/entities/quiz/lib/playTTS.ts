let _speechSynth: SpeechSynthesis;
let _voices: SpeechSynthesisVoice[]; // 모든 음성 목록
const _cache: Record<string, SpeechSynthesisVoice[]> = {}; // 언어별 음성 목록 캐시

// 음성 목록을 불러오는 함수
function loadVoicesWhenAvailable(onComplete = () => {}) {
  if (typeof window === "undefined") {
    return;
  }

  _speechSynth = window.speechSynthesis;
  const voices = _speechSynth.getVoices();

  if (voices.length !== 0) {
    _voices = voices;
    onComplete();
  } else {
    return setTimeout(function () {
      loadVoicesWhenAvailable(onComplete);
    }, 100);
  }
}

// 캐시로부터 언어별 음성 목록을 가져오는 함수
function getVoices(locale: string) {
  if (!_speechSynth) {
    throw new Error("Browser does not support speech synthesis");
  }
  if (_cache[locale]) return _cache[locale];

  _cache[locale] = _voices.filter((voice) => voice.lang === locale);
  return _cache[locale];
}

function playByText(text: string, onEnd = () => {}) {
  const locale = "ja-JP";
  const voices = getVoices(locale);

  // TODO: 값 변경 UI 만들기
  const utterance = new window.SpeechSynthesisUtterance();
  utterance.voice = voices[0];
  utterance.pitch = 1;
  // utterance.voiceURI = "native";
  // utterance.volume = 1;
  utterance.rate = 0.8;
  utterance.pitch = 0.8;
  utterance.text = text;
  utterance.lang = locale;

  if (onEnd) {
    utterance.onend = onEnd;
  }

  // 음성이 겹치지 않도록 취소
  _speechSynth.cancel();
  _speechSynth.speak(utterance);
}

loadVoicesWhenAvailable(function () {
  console.log("loaded");
});

export function playTTS(word: string) {
  setTimeout(() => playByText(word), 300);
}
