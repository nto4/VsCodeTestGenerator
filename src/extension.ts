// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
// tsconfig.json 	"noImplicitAny": false for type casting array
var countButtonTag: number;
var counInputTag: number;
var repeaterExist: number;
const modelnames: string[] = [];
const clicknames: string[] = [];

export function activate(context: vscode.ExtensionContext) {

	if (vscode.window.activeTextEditor != undefined) {
		var relativePath = (vscode.window.activeTextEditor.document.fileName);
		vscode.workspace.openTextDocument(relativePath).then((document) => {
			let text = document.getText();
			countButtonTag = (text.match(/button/g) || []).length;
			counInputTag = (text.match(/input/g) || []).length;
			repeaterExist = (text.match(/ng-repeat/g) || []).length;
			console.log(counInputTag);
			console.log(countButtonTag);
			var test = text.search("input");
			var string = text;
			var re = /\<input.*?ng-model.*?"(.*?)".*?\>/igs;
			var match;
			while ((match = re.exec(string)) != null) {
				modelnames.push(RegExp.$1);
			}
			var re2 = /\<button.*?ng-click.*?"(.*?)".*?\>/igs;
			var match2;
			while ((match2 = re2.exec(string)) != null) {
				clicknames.push(RegExp.$1);
			}
		});

		let disposable = vscode.commands.registerCommand('extension.TestGenerator', () => {

			if (vscode.window.activeTextEditor != undefined) {
				var currentlyOpenTabfilePath = (vscode.window.activeTextEditor.document.fileName);
				var fileNameArray = currentlyOpenTabfilePath.split("\\");
				var currentFileName = fileNameArray[(fileNameArray.length) - 1];

				var withOutEndfixFileNameAndPrefix = currentFileName.split(".");

				var xxx = withOutEndfixFileNameAndPrefix[0];

				currentFileName = xxx + '.spec.js';

				var modelname: string = "NgModelValue";
				var clickname: string = "NgModelValue";

				var belge: string;
				//let clickButton = "\n			element(by.id("+ clickname +")).click(); \n";
				//let sendKey = "\n   			element(by.model(" + modelname + ")).sendKeys('TypeHere'); \n";
				let expectKey = "\n 			expect(element(by.id('TypeHere')).getText()).toEqual('TypeHere'); \n";
				let describe = "describe('Type Describe', function (){";
				let itit = "\n	it('Type fetch details', async function () {";
				let angularCheck = "\n 		browser.waitForAngular";
				let headerCheck = "\n		await browser.get('http://localhost:TypeHere/');\n	\n		await expect(browser.getTitle()).toEqual('TypeHere');	";
				let ititEnd = "		\n\n	});";
				let describeEnd = "\n});";
				let belgeSendKey: string = "";
				let belgeExpectKey: string = "";
				//let repeater = "\n			 expect(element.all(by.repeater('Type in TypesHere')).count()).toEqual(TypeExpectCount); \n"
				//button element number =  countButtonTag/2
				//input element number = 	counInputTag
				function testGenerate(counInputTag: number, countButtonTag: number, repeaterExist: number, ngmodelValuesArr, ngclicklValuesArr) {
					if(ngmodelValuesArr.length < counInputTag)
					{
						console.log("dizin kucuk");
					console.log(ngmodelValuesArr.length);
					console.log(counInputTag);
					for (let index = ngmodelValuesArr.length; index < counInputTag; index++) {
						console.log("çalıştı");
						ngmodelValuesArr[index] = "\'CantFindModel\'";
					}
					console.log(ngmodelValuesArr);
				
					}
					if(ngclicklValuesArr.length < (countButtonTag/2))
					{
						console.log("dizin kucuk");
					console.log(ngmodelValuesArr.length);
					console.log(counInputTag);
					for (let index = ngclicklValuesArr.length; index < (countButtonTag/2); index++) {
						console.log("çalıştı");
						ngclicklValuesArr[index] = "\'CantFindButtonNgClick\'";
					}
					console.log(ngmodelValuesArr);
				
					}
					for (let index = 0; index < counInputTag; index++) {
						modelname = ngmodelValuesArr[index];
						belgeSendKey += "\n   			element(by.model(" + modelname + ")).sendKeys('TypeHere'); \n";
						belgeExpectKey += expectKey;
					}
					var belgeBody: string = "";
					// if (repeaterExist != 0) {
					// 	var belgeBody: string  = itit + belgeSendKey + clickButton + repeater + belgeExpectKey + ititEnd;
					// }
					// else {
					// 	var belgeBody: string = itit + belgeSendKey + clickButton + belgeExpectKey + ititEnd;
					// }

					for (let index = 0; index < countButtonTag / 2; index++) {
					//	if (clickname == undefined) {
						//	clickname = 'TypeHere';
						//	belgeBody += itit + belgeSendKey + "\n			element(by.id(" + clickname + ")).click(); \n" + belgeExpectKey + ititEnd;
						//}
						//else {
							clickname = ngclicklValuesArr[index];
							belgeBody += itit + belgeSendKey + "\n			element(by.id(" + clickname + ")).click(); \n" + belgeExpectKey + ititEnd;
						//}
					}
					belge =
						describe
						+ itit
						+ angularCheck
						+ headerCheck
						+ ititEnd
						+ belgeBody
						+ describeEnd;

					return belge;
				}
				var metin = testGenerate(counInputTag, countButtonTag, repeaterExist, modelnames, clicknames);
				vscode.window.showInformationMessage('Test page created');
				let folderPath = vscode.workspace.rootPath;
				if (folderPath !== undefined && vscode.workspace.rootPath != undefined) {
					let filePath = ("untitled:" + folderPath);
					const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.rootPath, currentFileName));
					//console.log(newFile);
					vscode.workspace.openTextDocument(newFile).then(document => {
						const edit = new vscode.WorkspaceEdit();
						edit.insert(newFile, new vscode.Position(0, 0), metin);
						return vscode.workspace.applyEdit(edit).then(success => {
							if (success) {
								vscode.window.showTextDocument(document);
								vscode.TextDocumentSaveReason;
								//Here  change save position for test page
							} else {
								vscode.window.showInformationMessage('Error!');
							}
						});
					});
				}
				else {
					vscode.window.showInformationMessage('Error!  Unable to combine file path extension and name');
				}
			}
			else {
				vscode.window.showInformationMessage('Error! cant find path');
			}
		});
		context.subscriptions.push(disposable);
	}
}
export function deactivate() { }


