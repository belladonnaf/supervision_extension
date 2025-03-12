import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.formatWithNewlines', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        const selection = editor.selection;
        let text = document.getText(selection);

        text = text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();

        let i = 0;
        text = text.replace(/(['"]?[\w_]+['"]?)\s*:\s*(('[^']+')|("[^"]+")|\{[^{}]*\}|\[[^\[\]]*\]|\w+)/g, (match, p1, p2) => {
            console.log([p1,p2]);
            let replacer_txt = '[NEWLINE_WILL_BE_REPLACE]';
            let key = `${(i > 0 ? replacer_txt : '')}${p1.startsWith('"') || p1.startsWith("'") ? p1 : `"${p1}"`}`;
            let value = p2.trim();
            i++;
            return `${key}: ${value}`;
        });

        text = text.replaceAll('[NEWLINE_WILL_BE_REPLACE]',"\n");

        editor.edit((editBuilder) => {
            editBuilder.replace(selection, text);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
