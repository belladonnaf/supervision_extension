import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.evalSelected', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor. Please open a file and select some text.");
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        const text = document.getText(selection);

        try {
            // Split the text into lines for evaluation
            const lines = text.split(/\r?\n/);

            // Evaluate each line and replace with the result
            const evaluatedLines = lines.map((line) => {
                try {
                    // Attempt to evaluate the line
                    const result = Function(`"use strict"; return (${line});`)();
                    return result.toString();
                } catch (error) {
                    // If evaluation fails, return the original line with a note
                    return `${line}`;
                }
            });

            // Join the evaluated lines back into a single string
            const result = evaluatedLines.join('\n');

            // Replace the selection with the evaluated result
            editor.edit((editBuilder) => {
                editBuilder.replace(selection, result);
            });
        } catch (error) {
            // Handle unexpected errors
            if (error instanceof Error) {
                vscode.window.showErrorMessage(`An unexpected error occurred: ${error.message}`);
            } else {
                vscode.window.showErrorMessage("An unexpected error occurred: Unknown error");
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
