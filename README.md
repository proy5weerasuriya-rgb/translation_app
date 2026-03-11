# PramoVoice | En-Fi Voice Translator

PramoVoice is a modern, real-time voice-activated translator that bridges the gap between English and Finnish. Designed for seamless communication, it provides instant speech-to-text translation with minimal latency.

## ✨ Features

- **📹 Live Video Feed**: Integrated webcam support with real-time subtitle overlay.
- **🎯 Real-time Voice Recognition**: Powered by the Web Speech API for high-accuracy live transcription.
- **🔄 Bidirectional Translation**: Instant toggle between English-to-Finnish and Finnish-to-English translation.
- **⚡ Zero Latency Feel**: Dynamic updates as you speak, with final translations appearing instantly upon pausing.
- **🎨 Premium UI**: A clean, accessible interface with pulsating status indicators and modern aesthetics.
- **📱 Responsive Design**: Works seamlessly across different screen sizes.

## 🚀 Technologies Used

- **Vite**: Next-generation frontend tooling for a fast development experience.
- **JavaScript (ES6+)**: Core logic for speech handling and UI interactions.
- **Vanilla CSS**: Custom-built design system with a premium look and feel.
- **Web Speech API**: Handles native speech recognition within the browser.
- **MyMemory API**: Reliable translation engine for multilingual support.

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v18+ recommended).
- **Supported Browser**: Use a modern browser that supports the Web Speech API (e.g., Google Chrome or Microsoft Edge).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/proy5weerasuriya-rgb/translation_app.git
   cd translation_app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:
```bash
npm run dev
```
Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

### Building for Production

To create an optimized production build:
```bash
npm run build
```

## 📖 Usage

1. **Grant Permissions**: When prompted, allow access to both your **microphone** and **camera**.
2. **Select Direction**: Use the toggle switch in the header to choose between "English" (translating to Finnish) and "Finnish" (translating to English).
3. **Speak**: Start talking. Your live video will appear along with real-time subtitles at the bottom.
4. **Read Translation**: The "Translation" box will display the converted text as soon as you finish a sentence.
5. **Monitor Status**: The pulsating dot in the status bar indicates when the application is actively listening.

## 📂 Project Structure

- `index.html`: Main entry point and application structure.
- `style.css`: Unified design system and component styling.
- `main.js`: Speech recognition logic and API integration.
- `package.json`: Project metadata and dependencies.
- `public/`: Static assets.

---

*Developed for "AI in Practice" course.*
