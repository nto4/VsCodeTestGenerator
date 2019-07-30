// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { create } from 'domain';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension  is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.action', () => {
		// The code you place here will be executed every time your command is executed
		
		// Display a message box to the user
		
		vscode.window.showInformationMessage('Action Called');
		let folderPath = vscode.workspace.rootPath; 
		if(folderPath !== undefined){
		//vscode.window.showInformationMessage("untitled: + $folderPath",folderPath);
		let filePath = ("untitled:"+folderPath);
		console.log(filePath);
		//let a = vscode.workspace.openTextDocument
		vscode.workspace.openTextDocument(filePath);
		/*
		vscode.WorkspaceEdit.createFile(vscode.Uri.file('c:\\Development\\Test\\hello2.txt'), {
            overwrite: true,
            ignoreIfExists: true
		});
		*/
		}
		//vscode.window.showInformationMessage('Say Çaça!');
		//const blabla = vscode.window.showInputBox({ value: 'test' }).then(text => {console.log(text);});
		//console.log(blabla);
		//blabla = vscode.window.showInputBox();
	
	});
	

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
