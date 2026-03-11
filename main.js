const transcriptEl = document.getElementById('transcript');
const translationEl = document.getElementById('translation');
const langToggle = document.getElementById('lang-toggle');
const labelEn = document.getElementById('label-en');
const labelFi = document.getElementById('label-fi');
const inputLabel = document.getElementById('input-label');
const outputLabel = document.getElementById('output-label');
const pulseDot = document.getElementById('pulse-dot');
const statusText = document.getElementById('status-text');

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
    } else {
      transcriptEl.innerText = interimTranscript || '...';
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
      translationEl.innerText = data.responseData.translatedText;
    }
  } catch (error) {
    console.error('Translation error:', error);
    translationEl.innerText = "Translation failed. Check connection.";
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
});
