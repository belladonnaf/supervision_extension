import * as vscode from 'vscode';

interface GroqApiResponse {
    choices?: {
        message?: {
            content: string;
        };
    }[];
}

export function activate(context: vscode.ExtensionContext) {
    // Register the command
    const disposable = vscode.commands.registerCommand('extension.generateDummyData', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        let text = document.getText(selection);

        // Prompt the user to input a number
        const inputNumber = await vscode.window.showInputBox({
            prompt: 'Enter the number of items to generate',
            validateInput: (value) => isNaN(Number(value)) ? 'Please enter a valid number' : null,
        });

        if (!inputNumber) {
            vscode.window.showErrorMessage('Input was canceled.');
            return;
        }

        const apiKey = vscode.workspace.getConfiguration('extensionSettings').get<string>('groqApiKey');

        if (!apiKey) {
            vscode.window.showErrorMessage('GROQ API Key is not configured. Please set it in settings.');
            return;
        }

        const prompt = `We need to fill dummy data with ${inputNumber} items like the structure below. Output like this: [{...},{...}]

${text}`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{
                    role: 'user',
                    content: prompt,
                }],
            }),
        });

        if (!response.ok) {
            vscode.window.showErrorMessage(`Error: ${response.statusText}`);
            return;
        }

		const rawResponse = await response.text();
		console.log('Raw API Response:', rawResponse);

		const data: GroqApiResponse = JSON.parse(rawResponse);

		if (!data.choices || !data.choices[0] || !data.choices[0].message) {
			console.error('Unexpected response structure:', data);
			vscode.window.showErrorMessage('API response structure is unexpected. Check logs for details.');
			return;
		}
	
		const result = data.choices[0].message.content || 'No response generated.';
		editor.edit((editBuilder) => {
			editBuilder.replace(selection, result);
		});

    });

    context.subscriptions.push(disposable);

    // Add configuration settings
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('extensionSettings.groqApiKey')) {
                vscode.window.showInformationMessage('GROQ API Key configuration updated.');
            }
        })
    );
}

export function deactivate() {}
