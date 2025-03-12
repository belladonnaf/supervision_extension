import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Helper function to parse numbers from the selected text
    function parseNumbersFromSelection(text: string): number[] {
        return text
            .split(/[\r\n\s]+/)
            .map((line) => parseFloat(line.trim()))
            .filter((num) => !isNaN(num));
    }

    // Helper function to calculate the result based on the operation
    function calculate(numbers: number[], operation: string): number | string {
        if (numbers.length === 0) return "No valid numbers selected";

        switch (operation) {
            case 'plus':
                return numbers.reduce((sum, num) => sum + num, 0);
            case 'minus':
                return numbers.reduce((result, num) => result - num);
            case 'multiply':
                return numbers.reduce((product, num) => product * num, 1);
            case 'divide':
                return numbers.reduce((result, num) => result / num);
            default:
                return "Invalid operation";
        }
    }

    // Generic command handler
    function registerCalculationCommand(commandId: string, operation: string) {
        const disposable = vscode.commands.registerCommand(commandId, () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }
            const document = editor.document;
            const selection = editor.selection;
            const text = document.getText(selection);

            // Parse numbers and calculate result
            const numbers = parseNumbersFromSelection(text);
            const result = calculate(numbers, operation);

            // Replace selected text with the result
            editor.edit((editBuilder) => {
                editBuilder.replace(selection, result.toString());
            });
        });

        context.subscriptions.push(disposable);
    }

    // Register commands for each operation
    registerCalculationCommand('extension.calcWithPlus', 'plus');
    registerCalculationCommand('extension.calcWithMinus', 'minus');
    registerCalculationCommand('extension.calcWithMultiply', 'multiply');
    registerCalculationCommand('extension.calcWithDivide', 'divide');
}

export function deactivate() {}
