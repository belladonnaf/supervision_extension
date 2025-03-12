import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

function cleanLine(line: string): string {
    return line.split(/#/)[0].trim();
}

function parseServerBlocks(text: string): string[] {
    const serverBlocks: string[] = [];
    const serverRegex = /server\s*{/g;
    let match;
    
    while ((match = serverRegex.exec(text)) !== null) {
        let braceCount = 1;
        let i = serverRegex.lastIndex;

        while (braceCount > 0 && i < text.length) {
            if (text[i] === '{') braceCount++;
            else if (text[i] === '}') braceCount--;
            i++;
        }

        if (braceCount === 0) {
            const serverContent = text.slice(match.index + match[0].length, i - 1).trim();
            serverBlocks.push(serverContent);
            serverRegex.lastIndex = i;
        }
    }
    return serverBlocks;
}

function parseLocationContent(content: string): Record<string, string> {
    const param: Record<string, string> = {};
    content.split('\n').forEach(line => {
        line = cleanLine(line);
        if (!line) return;
        line.split(';').forEach(part => {
            part = cleanLine(part);
            if (!part) return;
            const [key, ...values] = part.split(/\s+/);
            if (key) param[key] = values.join(' ');
        });
    });
    return param;
}

function parseNginxConfig(configText: string) {
    return parseServerBlocks(configText).map(serverContent => {
        const lines = serverContent.split(/\r?\n/);
        const topDirectives: { key: string, value: string }[] = [];
        const locations: any[] = [];
        let currentLineIndex = 0;

        while (currentLineIndex < lines.length) {
            let line = cleanLine(lines[currentLineIndex]);
            if (!line) {
                currentLineIndex++;
                continue;
            }

            if (line.startsWith('location')) {
                const match = line.match(/location\s+(.*?)\s*{/);
                if (!match) {
                    currentLineIndex++;
                    continue;
                }
                const path = match[1].trim();
                let content = '';
                currentLineIndex++;
                let depth = 1;

                while (currentLineIndex < lines.length && depth > 0) {
                    let currentLine = lines[currentLineIndex];
                    let clean = cleanLine(currentLine);
                    if (clean.includes('{')) depth += (clean.match(/{/g) || []).length;
                    if (clean.includes('}')) depth -= (clean.match(/}/g) || []).length;
                    if (depth === 0) {
                        content += clean.replace(/}/g, '') + '\n';
                        currentLineIndex++;
                        break;
                    } else {
                        content += currentLine + '\n';
                        currentLineIndex++;
                    }
                }
                locations.push({ path, param: parseLocationContent(content) });
            } else {
                if (line.endsWith(';')) {
                    line = line.slice(0, -1).trim();
                    const [key, ...values] = line.split(/\s+/);
                    topDirectives.push({ key, value: values.join(' ') });
                }
                currentLineIndex++;
            }
        }

        const server: any = { server_name: '', listen: '', location: locations };
        topDirectives.forEach(({ key, value }) => {
            server[key] = value;
        });

        return server;
    });
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.nginx_parser', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found');
            return;
        }
        const document = editor.document;
        const selection = editor.selection;
        const configText = document.getText(selection);

        try {
            const parsedData = parseNginxConfig(configText);
            vscode.window.showInformationMessage('Nginx Configuration Parsed!');
            vscode.workspace.openTextDocument({ language: 'json', content: JSON.stringify(parsedData, null, 2) }).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        } catch (error) {
            vscode.window.showErrorMessage('Error parsing configuration: ' + error);
        }
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}
