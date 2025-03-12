# GROQ Dummy Data Generator Extension

The GROQ Dummy Data Generator is a Visual Studio Code extension that allows developers to generate dummy data based on selected JSON-like structures directly in the editor. It interacts with the GROQ API to produce tailored outputs.

## Features

- Generate dummy data from JSON-like structures.
- Specify the number of items to generate.
- Fetch data from GROQ API using a configurable API key.
- Seamless integration with the active editor to replace selected text with generated content.

## Usage

1. Open a file and select the JSON-like structure you want to generate dummy data for.
2. Run the `Generate Dummy Data` command:
   - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
   - Search for `Generate Dummy Data` and select it.
3. Enter the number of items to generate when prompted.
4. The generated data will replace the selected text.

## Configuration

Before using the extension, configure the GROQ API key in your user or workspace settings:

1. Open the settings (`Ctrl+,` or `Cmd+,` on macOS).
2. Search for `extensionSettings.groqApiKey`.
3. Enter your GROQ API key.

Alternatively, add it directly to your `settings.json` file:

```json
"extensionSettings": {
    "groqApiKey": "your-api-key-here"
}
```

## Requirements

- Visual Studio Code (v1.70.0 or higher)
- GROQ API Key

## Extension Settings

This extension contributes the following settings:

- `extensionSettings.groqApiKey`: The API key for accessing the GROQ API.

## Error Handling

If an error occurs during the API request or the response structure is unexpected, an error message will be displayed in the editor. For debugging, check the logs in the Developer Tools console (`Help > Toggle Developer Tools`).

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests. If you encounter issues or have feature requests, please report them via GitHub Issues.

## Release Notes

### 0.0.1

- Initial release of the GROQ Dummy Data Generator.
- Core features: API integration, dummy data generation, and text replacement.

## License

This project is **not licensed**. You are free to do as you wish with the code, but please note that you do so at your own risk.
