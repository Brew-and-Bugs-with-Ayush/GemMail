# ✨ GemMail  
**Your AI-Powered Email Wizard for Gmail!** 🚀  
Transform your email game with GemMail’s sleek browser extension, powered by cutting-edge AI to craft professional, context-aware emails in a snap. Say goodbye to writer’s block and hello to effortless communication! 🎉

---

## 🌈 What is GemMail?

**GemMail** is your ultimate AI-powered email generator, designed to make email writing a breeze.  
With a stylish browser extension, GemMail injects a magical **"Generate Email"** button into Gmail, letting you create polished, personalized emails with a single click.

💡 Powered by the **Gemini API**, GemMail crafts intelligent, context-aware drafts that save time and make you shine—from professional pitches to casual notes!

---

## 🎯 Awesome Features

- 💌 **Seamless Gmail Magic**: Adds a slick "Generate Email" button right into Gmail’s compose window.  
- 🧠 **AI That Gets You**: Powered by Gemini API to generate tailored, professional emails in seconds.  
- 🎨 **Tone Your Way**: Customize tone, style, and length—formal, friendly, or creative!  
- 🌐 **Browser Buddy**: Works on Chrome, Firefox, and Edge.  
- ⚡ **Lightning-Fast UI**: Built with React and Vite for buttery-smooth performance.  
- 🛡️ **Rock-Solid Backend**: Java Spring Boot ensures secure, scalable performance.

---

## 🛠️ Tech Stack

| Category         | Technologies                                     |
|------------------|--------------------------------------------------|
| **Frontend**      | React, Vite, Tailwind CSS                        |
| **Backend**       | Java Spring Boot, Spring Security, REST API     |
| **AI Integration**| Gemini API for smart email generation           |
| **Extension**     | JavaScript, Manifest V3                          |
| **Tools**         | VS Code, IntelliJ IDEA, Git                     |

---

## 💡 Why GemMail Rocks

- ⏱️ **Time Saver Extraordinaire**: Automates email drafting so you can focus on what matters.  
- 🧾 **Pro-Level Emails**: Delivers polished, error-free emails for any occasion.  
- 🧭 **Super Easy to Use**: Intuitive design that feels like second nature.  
- 🗣️ **Your Voice, Amplified**: Customize emails to match your unique style.  
- 📬 **Gmail Native**: No clunky external tools—just pure Gmail integration.

---

## 🌍 Why GemMail Matters

- 🚀 **Supercharges Productivity**: Streamlines repetitive email tasks.  
- 💬 **Crystal-Clear Messaging**: Crafts concise, impactful emails.  
- 🌎 **Empowers Everyone**: Helps non-native speakers and writing newbies shine.  
- 📈 **Scales Like a Boss**: Perfect for high-volume roles like sales and support.

---

## 🚀 Get GemMail Up and Running

### 📋 Requirements

- Node.js (v16+)
- Java (JDK 17+)
- Maven
- Git
- VS Code (Frontend/Extension)
- IntelliJ IDEA (Backend)
- Google Chrome (or compatible browser)
- Gemini API Key

---

### 📥 Clone the Repo

```bash
git clone https://github.com/your-username/GemMail.git
cd GemMail
```

---

### ⚡ Frontend Setup (React + Vite)

```bash
cd email-generator-react
npm install
```

Create a `.env` file:

```env
VITE_GEMINI_API_KEY=your-api-key
VITE_GEMINI_API_URL=your-api-url
```

Run the dev server:

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

### 🌐 Browser Extension Setup

Navigate to the extension folder:

```bash
cd email-generator-extension
```

Make sure the following files exist:

- `Extension.png`
- `content.css`
- `content.js`
- `image.png`
- `manifest.json`

Build the extension:

```bash
npm install
npm run build
```

**Load in Chrome:**

1. Open `chrome://extensions/`
2. Toggle **Developer mode** on
3. Click **Load unpacked** → Select `email-generator-extension/build`

Open Gmail and find the shiny **"Generate Email"** button!

---

### 🖥️ Backend Setup (Spring Boot)

```bash
cd email-generator-sb
```

Open in IntelliJ IDEA and add your API key to:

```properties
# application.properties
gemini.api.key=your-api-key
gemini.api.url=your-api-url
```

Run the app:

```bash
mvn spring-boot:run
```

Confirm backend is live at: [http://localhost:8080](http://localhost:8080)

---

### 🔌 Test the API (Using Postman or any API Tool)

Before integrating the frontend or extension, it's a good idea to confirm that the backend API is working correctly.

#### ✅ Step 1: Start the Backend Server

---

## 📧 How to Use GemMail

1. **Launch Gmail** – Ensure the extension is active.  
2. **Hit Compose** – Start a new email.  
3. **Click "Generate Email"** – Let the AI do its magic.  
4. **Tweak It** – Customize tone, style, and message.  
5. **Send It** – Review and fire away!

---

## 📬 Let’s Connect

- 📧 Email: [ayushgupta.codex.com](mailto:ayushgupta.codex.com)  
- 🐛 GitHub Issues: [GemMail Issues](https://github.com/CodeXayush79/GemMail/issues)  
- 🔗 Follow on LinkedIn: [@ayush-gupta004](https://www.linkedin.com/in/ayush-gupta004)

---

⭐ **Love GemMail? Drop a star on GitHub!**  
Built with ❤️ by *Ayush Gupta (CodexAyush04)*  

