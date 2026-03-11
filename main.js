const transcriptEl = document.getElementById('transcript');
const translationEl = document.getElementById('translation');
const langToggle = document.getElementById('lang-toggle');
const labelEn = document.getElementById('label-en');
const labelFi = document.getElementById('label-fi');
const inputLabel = document.getElementById('input-label');
const outputLabel = document.getElementById('output-label');
const pulseDot = document.getElementById('pulse-dot');
const statusText = document.getElementById('status-text');
const webcamEl = document.getElementById('webcam');
const subtitlesEl = document.getElementById('subtitles');

let isEnToFi = true;
let recognition;

// Initialize Speech Recognition
const initRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    statusText.innerText = "Speech API not supported";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = isEnToFi ? 'en-US' : 'fi-FI';

  recognition.onstart = () => {
    pulseDot.classList.add('listening');
    statusText.innerText = "Listening...";
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
        translateText(finalTranscript);
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (finalTranscript) {
      transcriptEl.innerText = finalTranscript;
      updateSubtitles(finalTranscript);
    } else {
      transcriptEl.innerText = interimTranscript || '...';
      if (interimTranscript) updateSubtitles(interimTranscript);
    }
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    if (event.error === 'not-allowed') {
      statusText.innerText = "Mic Permission Denied";
    }
  };

  recognition.onend = () => {
    // Restart if it stops naturally (sometimes happens on mobile/silence)
    recognition.start();
  };

  recognition.start();
};

const translateText = async (text) => {
  if (!text.trim()) return;

  const sourceLang = isEnToFi ? 'en' : 'fi';
  const targetLang = isEnToFi ? 'fi' : 'en';

  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
    const data = await response.json();

    if (data.responseData) {
      const translated = data.responseData.translatedText;
      translationEl.innerText = translated;
      updateSubtitles(translated, true);
    }
  } catch (error) {
    console.error('Translation error:', error);
    translationEl.innerText = "Translation failed. Check connection.";
  }
};

const updateSubtitles = (text, isTranslation = false) => {
  if (!text) return;
  subtitlesEl.innerText = text;
  subtitlesEl.style.opacity = '1';
};

const initCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    webcamEl.srcObject = stream;
  } catch (err) {
    console.error("Camera access error:", err);
    subtitlesEl.innerText = "Camera access denied or unavailable.";
  }
};

const updateUI = () => {
  labelEn.classList.toggle('active', isEnToFi);
  labelFi.classList.toggle('active', !isEnToFi);

  if (isEnToFi) {
    inputLabel.innerText = "Listening (English)";
    outputLabel.innerText = "Translation (Finnish)";
    transcriptEl.innerText = "Speak in English...";
    translationEl.innerText = "Ennuste tulee tänne...";
  } else {
    inputLabel.innerText = "Kuunnellaan (Suomi)";
    outputLabel.innerText = "Translation (English)";
    transcriptEl.innerText = "Puhu suomeksi...";
    translationEl.innerText = "Translation will appear here...";
  }

  if (recognition) {
    recognition.stop();
    recognition.lang = isEnToFi ? 'en-US' : 'fi-FI';
    // recognition.start() is called in onend
  }
};

langToggle.addEventListener('change', () => {
  isEnToFi = !langToggle.checked;
  updateUI();
});

// Start the app
window.addEventListener('DOMContentLoaded', () => {
  initRecognition();
  initCamera();
});
