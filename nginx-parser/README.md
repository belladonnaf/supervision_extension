# Nginx Conf Parser

## Description

Nginx Conf Parser is a Visual Studio Code extension that allows users to parse Nginx server block configurations and convert them into a structured JSON format. This tool is useful for analyzing, modifying, or programmatically interacting with Nginx configurations in an easier-to-read format.

### Sample JSON Output

```json
[
  {
    "server_name": "test.sample.com",
    "listen": "80",
    "location": [
      {
        "path": "/",
        "param": {
          "proxy_redirect": "off",
          "proxy_set_header": "X-Forwarded-Proto $scheme",
          "proxy_pass": "http://127.0.0.1:58634",
          "proxy_read_timeout": "7200",
          "proxy_connect_timeout": "7200"
        }
      }
    ]
  },
]
```

## Features

- **Effortless Parsing**: Automatically extracts and converts Nginx configuration server blocks into JSON format.
- **Easy Selection**: Users can select the required portion of their configuration file.
- **Quick Execution**: With a simple command, the parsing is executed instantly.
- **Structured Output**: The output JSON is formatted in a readable structure, making it easy to analyze or modify.
- **Supports Multiple Server Blocks**: Parses and structures multiple server blocks from the configuration.

## Installation

1. Open **Visual Studio Code**.
2. Go to **Extensions** (`Ctrl+Shift+X`).
3. Search for `Nginx Conf Parser`.
4. Click **Install**.
5. Once installed, the extension is ready to use.

## Usage

### 1. Selecting Text

- Open an Nginx configuration file (`nginx.conf` or similar) in VS Code.
- Select the **server block** or portion of the configuration you want to parse.

### 2. Running the Extension

- Press `` to open the command palette.
- Type and select ``.

### 3. Viewing Results

- The parsed JSON output will be opened in a new editor window.
- You can copy, edit, or save the output for further use.

## License

This project is **not licensed**. You are free to use, modify, and distribute the code as you see fit. However, it comes **without any warranty or guarantee**. Use it at your own risk.

