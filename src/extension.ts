// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { create } from 'domain';
import * as fs from 'fs';
//var x = require ("./../spec-template.txt");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension  is now active!');
	fs.readFile("./spec-template.txt",(err,buf)=>{console.log(buf.toString());});
	//console.log(x);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.action', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		if (vscode.window.activeTextEditor != undefined) {
			var currentlyOpenTabfilePath = (vscode.window.activeTextEditor.document.fileName);
			var fileNameArray = currentlyOpenTabfilePath.split("\\");
			var currentFileName = fileNameArray[(fileNameArray.length)-1];
			currentFileName = currentFileName + '.spec.js';
			//console.log(fileNameCurrent);

			//var currentlyOpenTabfilePath = (vscode.window.activeTextEditor.document.fileName).toString();
			//var  currentTabName = currentlyOpenTabfilePath.split(" " , 1);
			//var currentTabName2 = currentTabName.splice(" ");
			//console.log(currentTabName);
			let metin = " asdadsadas asdconsole.log('Hello World');";
		
		vscode.window.showInformationMessage('Action Called');
		let folderPath = vscode.workspace.rootPath;
		if (folderPath !== undefined) {
			let filePath = ("untitled:" + folderPath);
			//console.log(filePath);
			if (vscode.workspace.rootPath != undefined) {
				const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.rootPath, currentFileName));
				//console.log(newFile);
				vscode.workspace.openTextDocument(newFile).then(document => {
					const edit = new vscode.WorkspaceEdit();
					edit.insert(newFile, new vscode.Position(0, 0), metin);
					return vscode.workspace.applyEdit(edit).then(success => {
						if (success) {
							vscode.window.showTextDocument(document);
						} else {
							vscode.window.showInformationMessage('Error!');
						}
					});
				});
			}
			//sniplet
			//vscode.workspace.openTextDocument().then(doc => vscode.window.showTextDocument(doc));//.then(doc => vscode.workspace.applyEdit.name);

		}	}
	});


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }