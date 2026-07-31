# Termux Android Discord Bot 📱🤖

A lightweight Node.js Discord bot designed to run directly on an Android device via Termux. This bot acts as a bridge between Discord and the Android kernel, allowing you to remotely monitor and control your phone's hardware directly from a Discord chat.

**⚠️ SECURITY WARNING:** This bot essentially acts as a Remote Administration Tool (RAT). The code includes a strict `OWNER_ID` security gate to prevent unauthorized access. **Do not remove this check**, or anyone in your server will be able to control your phone's camera, GPS, and clipboard. Never upload your actual Discord Bot Token to GitHub.

## Features
* **🔋 `!battery`**: Fetches live battery percentage, health, temperature, and charging status.
* **📍 `!location`**: Pings the device's GPS module for exact coordinates and altitude.
* **📸 `!photo`**: Silently captures a photo using the rear camera and uploads it to Discord.
* **📋 `!clipboard`**: Retrieves the current text copied to the Android system clipboard.
* **📳 `!vibrate`**: Triggers the phone's haptic motor.
* **🗣️ `!tts [text]`**: Forces the phone to speak the provided text out loud.
* **💬 `!toast [text]`**: Displays a temporary system-level pop-up message on the phone screen.

## Prerequisites
To run this bot, you cannot use the Google Play Store version of Termux (it is outdated and broken). You must use F-Droid.

1. **[Termux](https://f-droid.org/en/packages/com.termux/)**: Installed via F-Droid.
2. **[Termux:API App](https://f-droid.org/en/packages/com.termux.api/)**: Installed via F-Droid. 
   * *Note: You must go into your Android Settings and grant this app permissions for Camera and Location, and set battery usage to "Unrestricted".*
3. **Node.js**: Installed inside Termux.

## Installation & Setup

1. **Install required packages in Termux:**
   ```bash
   pkg update -y && pkg upgrade -y
   pkg install termux-api nodejs git -y


2. **Clone the repository:**
   ```bash
   git clone [https://github.com/Talhasajid674/mobile_control.git](https://github.com/Talhasajid674/mobile_control.git)
   cd mobile_control
```


3. **Install dependencies:**
```bash
npm install discord.js

```


4. **Configure your credentials:**
Open `index.js` (or your main bot file) and replace the placeholder values with your actual data:
* `TOKEN`: Your Discord Bot Token (Enable the **Message Content Intent** in the Discord Developer Portal).
* `OWNER_ID`: Your personal Discord User ID (Required to pass the security gate).


5. **Run the bot:**
```bash
node index.js

```



## Usage

Once the bot is online, send any of the supported commands in a Discord server where the bot is present. **Commands will only execute if sent by the user matching the `OWNER_ID`.**

---

*Disclaimer: This project is for educational purposes and personal use. Ensure you comply with Discord's Terms of Service when deploying self-hosted bots.*
