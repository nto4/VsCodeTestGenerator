// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
//import { create } from 'domain';
import * as fs from 'fs';
import { parse } from 'node-html-parser';
//var x = require ("./../spec-template.txt");
var countButtonTag: number;
var counInputTag: number;
var repeaterExist: number;
export function activate(context: vscode.ExtensionContext) {

	
	if (vscode.window.activeTextEditor != undefined) {
		var relativePath = (vscode.window.activeTextEditor.document.fileName);
		vscode.workspace.openTextDocument(relativePath).then((document) => {
			let text = document.getText();
			countButtonTag = (text.match(/button/g) || []).length;
			
			counInputTag = (text.match(/input/g) || []).length;

			repeaterExist = (text.match(/ng-repeat/g) || []).length;

			var test = text.search("input");
			//console.log(test);
			var string = text;

var re = /\<input.*?ng-model.*?"(.*?)".*?\>/ig
var match;
var x =[];
//console.log(string.match(re));

while ((match = re.exec(string)) != null){
  	console.log(RegExp.$1);
  var input = match[0],
  re1 = /ng-model="(.*?)"/ig;
//console.log(re1.exec(input)[1]);
 
	x.push(match[0]);
}


//console.log(x[0]);

			
		});
	}

	let disposable = vscode.commands.registerCommand('extension.action', () => {

		if (vscode.window.activeTextEditor != undefined) {
			var currentlyOpenTabfilePath = (vscode.window.activeTextEditor.document.fileName);
			var fileNameArray = currentlyOpenTabfilePath.split("\\");
			var currentFileName = fileNameArray[(fileNameArray.length) - 1];

			var withOutEndfixFileNameAndPrefix = currentFileName.split(".");

			var xxx = withOutEndfixFileNameAndPrefix[0];

			currentFileName = xxx + '.spec.js';

			{



				var belge: string;
				let clickButton = "\n			element(by.id('TypeHere')).click(); \n";
				let sendKey = "\n   			element(by.name('TypeHere')).sendKeys('TypeHere'); \n";
				let expectKey = "\n 			expect(element(by.id('TypeHere')).getText()).toEqual('TypeHere'); \n";
				let describe = "describe('Type Describe', function ()";
				let itit = "{\n	it('Type fetch details', async function () {";
				let angularCheck = "\n 		browser.waitForAngular";
				let headerCheck = "\n		await browser.get('http://localhost:TypeHere/');\n	\n		await expect(browser.getTitle()).toEqual('TypeHere');	";
				let ititEnd = "		\n\n	});";
				let describeEnd = "\n});";
				let belgeSendKey: string = "";
				let belgeExpectKey: string = "";
				let repeater ="\n			 expect(element.all(by.repeater('Type in TypesHere')).count()).toEqual(TypeExpectCount); \n"
				//button element number =  countButtonTag/2
				//input element number = 	counInputTag
				function testGenerate(counInputTag: number, countButtonTag: number, repeaterExist: number) {
					for (let index = 0; index < counInputTag; index++) {
						belgeSendKey += sendKey;
						belgeExpectKey += expectKey;

					}
					if(repeaterExist != 0){
						var belgeBody: string = itit + belgeSendKey + clickButton + repeater + belgeExpectKey + ititEnd;
					}
					else{
						var belgeBody: string = itit + belgeSendKey + clickButton + belgeExpectKey + ititEnd;
					}
					
					
					for (let index = 0; index < countButtonTag/4; index++) {
						
						belgeBody += belgeBody;
						
					}
					
					belge = describe +
						itit
						+ angularCheck
						+ headerCheck
						+ ititEnd

					

						+ belgeBody

					
						+ describeEnd;
						
					return belge;

				}
				var metin = testGenerate(counInputTag, countButtonTag,repeaterExist);
				
			}
			vscode.window.showInformationMessage('Action Called');
			let folderPath = vscode.workspace.rootPath;
			if (folderPath !== undefined) {
				let filePath = ("untitled:" + folderPath);
				if (vscode.workspace.rootPath != undefined) {
					const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.rootPath, currentFileName));
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
export function deactivate() { }


