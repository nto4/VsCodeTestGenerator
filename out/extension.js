"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
// tsconfig.json 	"noImplicitAny": false for type casting array
var countButtonTag;
var counInputTag;
var repeaterExist;
const x = [];
const xx = [];
function activate(context) {
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
                x.push(RegExp.$1);
            }
            var re2 = /\<button.*?ng-click.*?"(.*?)".*?\>/igs;
            var match2;
            while ((match2 = re2.exec(string)) != null) {
                xx.push(RegExp.$1);
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
                var modelname = "NgModelValue";
                var clickname = "NgModelValue";
                var belge;
                //let clickButton = "\n			element(by.id("+ clickname +")).click(); \n";
                //let sendKey = "\n   			element(by.model(" + modelname + ")).sendKeys('TypeHere'); \n";
                let expectKey = "\n 			expect(element(by.id('TypeHere')).getText()).toEqual('TypeHere'); \n";
                let describe = "describe('Type Describe', function ()";
                let itit = "{\n	it('Type fetch details', async function () {";
                let angularCheck = "\n 		browser.waitForAngular";
                let headerCheck = "\n		await browser.get('http://localhost:TypeHere/');\n	\n		await expect(browser.getTitle()).toEqual('TypeHere');	";
                let ititEnd = "		\n\n	});";
                let describeEnd = "\n});";
                let belgeSendKey = "";
                let belgeExpectKey = "";
                //let repeater = "\n			 expect(element.all(by.repeater('Type in TypesHere')).count()).toEqual(TypeExpectCount); \n"
                //button element number =  countButtonTag/2
                //input element number = 	counInputTag
                function testGenerate(counInputTag, countButtonTag, repeaterExist, ngmodelValuesArr, ngclicklValuesArr) {
                    for (let index = 0; index < counInputTag; index++) {
                        modelname = ngmodelValuesArr[index];
                        belgeSendKey += "\n   			element(by.model(" + modelname + ")).sendKeys('TypeHere'); \n";
                        belgeExpectKey += expectKey;
                    }
                    var belgeBody = "";
                    // if (repeaterExist != 0) {
                    // 	var belgeBody: string  = itit + belgeSendKey + clickButton + repeater + belgeExpectKey + ititEnd;
                    // }
                    // else {
                    // 	var belgeBody: string = itit + belgeSendKey + clickButton + belgeExpectKey + ititEnd;
                    // }
                    for (let index = 0; index < countButtonTag / 2; index++) {
                        clickname = ngclicklValuesArr[index];
                        belgeBody += itit + belgeSendKey + "\n			element(by.id(" + clickname + ")).click(); \n" + belgeExpectKey + ititEnd;
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
                console.log(x);
                console.log(xx);
                var metin = testGenerate(counInputTag, countButtonTag, repeaterExist, x, xx);
                vscode.window.showInformationMessage('Test page created');
                let folderPath = vscode.workspace.rootPath;
                if (folderPath !== undefined) {
                    let filePath = ("untitled:" + folderPath);
                    //console.log(vscode.workspace.rootPath);
                    //console.log(vscode.workspace.workspaceFolders);
                    if (vscode.workspace.rootPath != undefined) {
                        const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.rootPath, currentFileName));
                        vscode.workspace.openTextDocument(newFile).then(document => {
                            const edit = new vscode.WorkspaceEdit();
                            edit.insert(newFile, new vscode.Position(0, 0), metin);
                            return vscode.workspace.applyEdit(edit).then(success => {
                                if (success) {
                                    vscode.window.showTextDocument(document);
                                }
                                else {
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
            vscode.workspace.findFiles;
        });
        context.subscriptions.push(disposable);
    }
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map