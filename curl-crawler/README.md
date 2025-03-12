# CURL Crawler

## Description

CURL Crawler is a Visual Studio Code extension designed to make retrieving HTTP response values easier. The tool works by allowing you to copy the `curl` command from Chrome DevTools (or any browser's developer tools), paste it into VSCode, and execute it. This extension processes the `curl` command, sending the request to the server and retrieving the response data. It provides a simple way to test APIs or debug network requests directly from your development environment.

## Features

- Copy `curl` commands from Chrome DevTools (or other browsers) and execute them in VSCode.
- Automatically parse and send HTTP requests to the server.
- View detailed response output within VSCode.
- Useful for API testing, debugging, and network request analysis.
- Easy integration into your existing workflow within Visual Studio Code.

## Installation

1. Open **Visual Studio Code**.
2. Go to **Extensions** (`Ctrl+Shift+X`).
3. Search for `CURL Crawler`.
4. Click **Install**.
5. Once installed, the extension is ready to use.

## Usage

### 1. Copy curl Command from Chrome DevTools (F12)
- Open **Chrome DevTools** (F12 or right-click → Inspect).
- Go to the **Network** tab.
- Right-click on any request you want to test and select **Copy as cURL** (cmd).
- This will copy the `curl` command in the correct format.

### 2. Paste to VSCode
- Open Visual Studio Code.
- Create a new file or open an existing file where you want to use the extension.
- Paste the copied `curl` command into the file.

### 3. Selecting Text
- Select the entire `curl` command that you just pasted into the file.

### 4. Run Extension
- Right-click the selected text and choose **Run CURL Command** from the context menu (or use a keyboard shortcut, if configured).
- The extension will process the `curl` command and send the request to the server.

### 5. Check Response Output
- After executing the request, the extension will display the server's response in a new output window or in the integrated terminal within VSCode.
- You can inspect the response headers, status code, and body content for analysis or debugging.

## License

This project is **not licensed**. You are free to use, modify, and distribute the code as you see fit. However, it comes **without any warranty or guarantee**. Use it at your own risk.
