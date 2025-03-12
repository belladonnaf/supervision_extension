# Dir and Sorting

A simple and efficient Visual Studio Code extension for sorting directory listings by date and time. This extension is perfect for users who often work with directory information and need a quick way to sort and organize file metadata directly from their editor.

---

## Features

- Parse and process directory listings from the selected text.
- Sort files and directories by date and time in ascending or descending order.
- Replace the selected text with the sorted result in a clean and organized format.
- Supports standard `DIR` command output for seamless integration.

---

## Usage

### Step 1: Prepare Your Directory Listing
Copy the output of your `DIR` command or similar directory information into your editor. For example:

```
12/31/2024  09:02 AM           215,516 package-lock.json
01/06/2025  08:24 AM             1,292 package.json
01/04/2025  01:58 PM             1,601 README.md
01/06/2025  08:00 AM    <DIR>          src
12/31/2024  07:18 AM               536 tsconfig.json
12/31/2024  07:13 AM             3,098 vsc-extension-quickstart.md
```
### Step 2: Select the Directory Listing
Highlight the directory listing text in the editor that you wish to sort.

### Step 3: Open the Command Palette
Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS) to open the Visual Studio Code Command Palette.

### Step 4: Sort the Selection
Type and select:
- `Dir and Sorting: Ascending Sort` to sort the entries by date and time in ascending order.
- `Dir and Sorting: Descending Sort` to sort the entries by date and time in descending order.

```
12/31/2024 07:13 vsc-extension-quickstart.md
12/31/2024 07:18 tsconfig.json
12/31/2024 09:02 package-lock.json
01/04/2025 01:58 README.md
01/06/2025 08:00 src
01/06/2025 08:24 package.json
```

### Step 5: Review the Sorted Output
The selected text will be replaced with the sorted results. Example sorted output in ascending order:

## License

This project is **not licensed**. You are free to do as you wish with the code, but please note that you do so at your own risk.
