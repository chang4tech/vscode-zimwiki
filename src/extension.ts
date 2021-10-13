// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';
// const changeCase = require("change-case");

let dt = new Date();
let dateString = dt.toLocaleString() + " ";

async function createNew() {
	try {
		// const workspaceRootPath = vscode.workspace.rootPath;
		const workspaceFolders = vscode.workspace.workspaceFolders;
  
	//   const workingPathDir = getWorkingPathDir(
	// 	_context,
	// 	vscode.window.activeTextEditor,
	// 	vscode.workspace
	//   );
	//   console.log("workingPathDir: " + workingPathDir);
	// console.log("workspaceRootPath: " + workspaceRootPath);
		// vscode.window.showInformationMessage("workspaceFolders: " + workspaceFolders);

		let name: string | undefined = await vscode.window.showInputBox({
			prompt: "Enter a name for new note.",
			ignoreFocusOut: true,
			validateInput: (s: string): string | undefined => s && s.trim() ? undefined : "The input must not be empty",
		});
		if (!name) {
			// name = await vscode.window.showInputBox({
			// 	prompt: "Enter a name for new note.",
			// 	ignoreFocusOut: true,
			// 	validateInput: (s: string): string | undefined => s && s.trim() ? undefined : "The input must not be empty",
			// });
			name = 'home';
		}else{
			vscode.window.showInformationMessage(`Successfully get Page ${name}.txt`);
			
		}
		
		
		// const DEFAULT_FORMAT = "Weekday, DD MMM YYYY HH:mm:ss +Timezone";
		const now = new Date();
		now.setMilliseconds(0);
		now.setSeconds(0);
		// const dateString = now.toDateString();
		// const dateString = now.toUTCString();
		// const dateString = now.toISOString();
		// const dateString = now.toLocaleString();
		// const dateString = now.toTimeString();
		// const dateString = now.toString();
		// const dateString = now.toLocaleTimeString();
		// const dateString = now.toLocaleDateString();
		// const dateString = now.toISOString().slice(0,-5) +' '+ now.getTimezoneOffset();
		const timezone = -now.getTimezoneOffset()/60;
		const dateString = now.toISOString().slice(0,-5) + (timezone<0?'':'+')+timezone+':00';
		var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

		var weekdayName = weekdays[ now.getDay() ];
		var monthName = months[ now.getMonth() ];
		const day = now.getDate();
		const year = now.getFullYear();

		
		


		vscode.window.showInformationMessage('Creation-Date: ' + dateString);
		
		const wsedit = new vscode.WorkspaceEdit();
		if(workspaceFolders !== undefined){
			
			const wsPath = workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
			const filePath = vscode.Uri.file(wsPath + `/${name}.txt`);
			vscode.window.showInformationMessage(filePath.toString());
			wsedit.createFile(filePath, { ignoreIfExists: true });
			const content = `Content-Type: text/x-zim-wiki\nWiki-Format: zim 0.6\nCreation-Date: ${dateString}\n\n====== ${name} ======\nCreated ${weekdayName} ${day} ${monthName} ${year}\n\n`;
			fs.stat(filePath.toString(), function(err, stat) {
				// if(err === null) {
				// 	console.log('File exists');
				// } else if(err.code === 'ENOENT') {
				// 	// file does not exist
				// 	// fs.writeFile('log.txt', 'Some log\n');
					fs.writeFile(filePath.fsPath, content);
				// } else {
				// 	console.log('Some other error: ', err.code);
				// }
			});
			
			vscode.workspace.applyEdit(wsedit);
			const editor = vscode.window.activeTextEditor;
			// if (editor) {
			// 	const selections = editor.selections;

			// 	editor.edit((editBuilder) => {
			// 	selections.forEach((selection) => {
			// 		editBuilder.replace(selection, "");
			// 		// editBuilder.insert(selection.active, text);
			// 	});
			// 	});
			// }


			// vscode.workspace.openTextDocument(filePath);
			vscode.workspace.openTextDocument(filePath).then(doc => {
				vscode.window.showTextDocument(doc);
			});

			vscode.window.showInformationMessage(`Created a new file: ${name}.txt`);
		}else{
			vscode.window.showInformationMessage('No workspace.');
		}
		
	


	  
	  
  
	  
	  
	  vscode.window.showInformationMessage("Zim: new note created!");
	} catch (e) {
	//   console.error(e.stack);
	//   vscode.window.showErrorMessage(e.message);
	  console.error(e);
	//   vscode.window.showErrorMessage(e.message);
	}
  }

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "zim-wiki" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('zim-wiki.helloZim', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Zim-Wiki!');
	});

	context.subscriptions.push(disposable);
	disposable = vscode.commands.registerCommand('zim-wiki.createNote', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Create Note from Zim-Wiki!');
		// vscode.workspace.openTextDocument();
		createNew();
		// vscode.window.showSaveDialog();

	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
