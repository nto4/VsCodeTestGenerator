// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
//import { create } from 'domain';
import * as fs from 'fs';
//var x = require ("./../spec-template.txt");
export function activate(context: vscode.ExtensionContext) {

	//console.log('Congratulations, your extension  is now active!');
	/*vscode.workspace.openTextDocument(uri).then((document) => {
		let text = document.getText();
	  });
	  */
	 if (vscode.window.activeTextEditor != undefined) {
		var relativePath = (vscode.window.activeTextEditor.document.fileName);
	 //console.log(vscode.window.activeTextEditor.document.fileName);
	 vscode.workspace.openTextDocument(relativePath).then((document) => {
		let text = document.getText();
		console.log(text);
	  });
	 }

	//fs.readFile("./spec-template.txt",(err,buf)=>{console.log("asdad"+buf.toString());});
	//console.log(x);
	//var text = fs.readFileSync('spec-template.js','utf8');
	//console.log (text);

	/*
	function readContent(callback) {
		fs.readFile("./Index.html", function (err, content) {
			if (err) return callback(err)
			callback(null, content)
		})
	}
	
	readContent(function (err, content) {
		console.log(content)
	})
	*/
	let disposable = vscode.commands.registerCommand('extension.action', () => {

		if (vscode.window.activeTextEditor != undefined) {
			var currentlyOpenTabfilePath = (vscode.window.activeTextEditor.document.fileName);
			var fileNameArray = currentlyOpenTabfilePath.split("\\");
			var currentFileName = fileNameArray[(fileNameArray.length) - 1];
			//console.log(currentFileName);
			var withOutEndfixFileNameAndPrefix = currentFileName.split(".");
			//console.log(withOutEndfixFileNameAndPrefix);
			var xxx = withOutEndfixFileNameAndPrefix[0];
			//console.log(xxx);
			currentFileName = xxx + '.spec.js';
			
			{
			let describe = "describe('Type Describe', function ()";
			let itit = "{\n	it('Type fetch details', async function () {";
			let angularCheck ="\n 	browser.waitForAngular";
			let headerCheck ="\n		await browser.get('http://localhost:TypeHere/');\n\n	\n		await expect(browser.getTitle()).toEqual('TypeHere');	";
			let ititEnd = "		\n\n	});";
			let describeEnd = "\n});";
			var metin = describe + itit + angularCheck + headerCheck + ititEnd +describeEnd;
			}
			//console.log(metin);
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

			}
			else {
				vscode.window.showInformationMessage('Error!  Unable to combine file path extension and name');
			}

		}
		else {
			vscode.window.showInformationMessage('Error! cant find path');
		}
		vscode.workspace.findFiles
	});


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


