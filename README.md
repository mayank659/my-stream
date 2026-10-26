# 🎬 My Stream — Frontend

My Stream is a React-based YouTube watch-party application that allows users to create or join rooms and watch videos together with synchronized playback.

This repository contains the **frontend** of My Stream, built with React and connected to a Flask and Socket.IO backend for real-time communication.

## ✨ Features

* 🎥 YouTube video player integration.
* 🔑 Join watch rooms using a 4-digit Room ID.
* 🏠 Create and join watch rooms.
* ▶️ Synchronized video playback.
* ⚡ Real-time communication through Socket.IO.
* 📱 Interactive and user-friendly interface.
* 🌐 Deployed frontend accessible through a web browser.

## 🛠️ Technologies Used

* React.js
* JavaScript
* CSS
* React Router
* Socket.IO Client
* Vite

## 🌐 Live Demo

**Frontend:** https://my-stream-omega.vercel.app/

## ⚙️ Backend

The frontend communicates with a separate Flask and Flask-SocketIO backend to manage rooms and synchronize video playback.

The backend URL is configured using the `VITE_BACKEND_URL` environment variable.

## 🚀 Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/my-stream.git
cd my-stream
```

Replace `YOUR_USERNAME` and `my-stream` with your actual GitHub username and repository name.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the frontend root directory:

```env
VITE_BACKEND_URL=http://127.0.0.1:5000
```

Replace the URL with your deployed backend URL if you want to connect to the online backend.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 📂 Project Structure

This repository contains the React frontend, including its components, pages, styles, and public assets.

```text
my-stream/
├── public/
├── src/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Note: The structure above is an example. Actual files may differ.*

## 🎯 Project Goal

The goal of My Stream is to provide a shared video-watching experience where users can connect through rooms and enjoy synchronized YouTube playback.

## 👨‍💻 Author

Developed as a web development project using React, JavaScript, and Socket.IO Client.
