import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Define the structure of ParsedData
    type ParsedData = {
        datetime: string;
        filename: string;
    };

    // Helper function to parse text into ParsedData[]
    function processText(text: string): ParsedData[] {
        return text
            .split("\n")
            .map((line) =>
                line.split(' ').filter((word) => word) // Split line and remove empty entries
            )
            .map((words) => ({
                datetime: words[0] + ' ' + words[1], // Combine the first and second words
                filename: words[4] // Take the fifth word
            }));
    }

    // Function to parse the selected text into ParsedData[]
    function parseArrayFromSelection(text: string): ParsedData[] {
        return processText(text);
    }

    // Function to calculate based on the operation
    function calculate(data: ParsedData[], operation: string): ParsedData[] | string {
        switch (operation) {
            case 'ascending_sort':
                return data.sort((entry1, entry2) =>
                    new Date(entry1.datetime).getTime() - new Date(entry2.datetime).getTime()
                );
            case 'descending_sort':
                return data.sort((entry1, entry2) =>
                    new Date(entry2.datetime).getTime() - new Date(entry1.datetime).getTime()
                );
            default:
                return "Invalid operation";
        }
    }

    // Generic command handler
    function registerCalculationCommand(commandId: string, operation: string) {
        const disposable = vscode.commands.registerCommand(commandId, () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage("No active text editor found.");
                return;
            }
            const document = editor.document;
            const selection = editor.selection;
            const text = document.getText(selection);

            // Parse the text and perform the operation
            const parsedData = parseArrayFromSelection(text);
            const result = calculate(parsedData, operation);

            if (typeof result === "string") {
                vscode.window.showErrorMessage(result);
                return;
            }

            // Format the result as a string
            const resultText = result.map((item) => `${item.datetime} ${item.filename}`).join("\n");

            // Replace the selected text with the result
            editor.edit((editBuilder) => {
                editBuilder.replace(selection, resultText);
            });
        });

        context.subscriptions.push(disposable);
    }

    // Register commands for ascending and descending sort
    registerCalculationCommand('extension.dir_ascending_sort', 'ascending_sort');
    registerCalculationCommand('extension.dir_descending_sort', 'descending_sort');
}

export function deactivate() {}
