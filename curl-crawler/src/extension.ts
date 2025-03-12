import * as vscode from 'vscode';
import { spawn } from 'child_process';


function parseCurlCommand(command: string): string[] {
    command = command.trim().replace(/^curl\s+/, '');
    command = command.replace(/\^"/g, '"');

    const args: string[] = [];
    let currentArg = '';
    let insideQuotes = false;
    for (let i = 0; i < command.length; i++) {
        const char = command[i];
        if (char === '"') {
            insideQuotes = !insideQuotes;
            continue; 
        }
        if (char === ' ' && !insideQuotes) {
            if (currentArg !== '') {
                args.push(currentArg);
                currentArg = '';
            }
        } else {
            currentArg += char;
        }
    }
    if (currentArg) {
        args.push(currentArg);
    }
    return args;
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.curl-crawler', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found. Please paste your cURL command into an open editor.');
            return;
        }

        const selection = editor.selection;
        let text = editor.document.getText(selection);
        if (!text.trim().startsWith('curl ')) {
            vscode.window.showErrorMessage('Selected text does not appear to be a cURL command.');
            return;
        }

        const regex1 = /\^\r\n/gm;
        text = text.replace(regex1, '').trim();

        const outputChannel = vscode.window.createOutputChannel('cURL Output');
        outputChannel.show(true);
        outputChannel.appendLine('Debug: Normalized cURL command:');
        outputChannel.appendLine(text);

        outputChannel.appendLine('Parsing cURL command arguments...\n');

        const args = parseCurlCommand(text);
        outputChannel.appendLine(`Parsed arguments: ${JSON.stringify(args)}`);

        outputChannel.appendLine('Executing cURL command...\n');

        const curlProcess = spawn('curl', ['-v', ...args]);
        let output = '';
        curlProcess.stdout.on('data', (data) => {
            output += data.toString();
            outputChannel.append(output);
            vscode.workspace.openTextDocument({ content: output, language: 'plaintext' }).then((doc) => {
                vscode.window.showTextDocument(doc, { preview: false });
            });
        });

        curlProcess.stderr.on('data', (data) => {
            outputChannel.append(data.toString());
        });

        curlProcess.on('close', (code) => {
            outputChannel.appendLine(`\nProcess exited with code ${code}`);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
