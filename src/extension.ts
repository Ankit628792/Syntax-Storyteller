import * as vscode from "vscode";
import { generateStory, styles as availableStyles } from "./storyteller";

export function activate(context: vscode.ExtensionContext) {
	console.log("Syntax Storyteller activated");

	const disposable = vscode.commands.registerCommand(
		"syntaxStoryteller.tellStory",
		async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage("Open a file to tell its story!");
				return;
			}

			const selection = editor.selection;
			const code = editor.document.getText(selection);
			if (!code || code.trim().length === 0) {
				vscode.window.showInformationMessage("Please select some code first.");
				return;
			}

			const style = await vscode.window.showQuickPick(availableStyles, {
				placeHolder: "Choose your storytelling style",
			});
			if (!style) return;

			// generate story text
			const story = generateStory(style, code);

			// split into intro/outro
			const lines = story.split("\n").filter((l) => l.trim().length > 0);
			const intro = lines.shift() ?? "";
			const outro = lines.join(" ") || "";

			// comment delimiters per language
			type CommentStyle = { line?: string; blockStart?: string; blockEnd?: string };
			const commentMap: Record<string, CommentStyle> = {
				javascript: { blockStart: "/*", blockEnd: "*/" },
				typescript: { blockStart: "/*", blockEnd: "*/" },
				json: { line: "//" },
				jsonc: { line: "//" },
				python: { line: "#" },
				ruby: { line: "#" },
				shellscript: { line: "#" },
				bash: { line: "#" },
				powershell: { line: "#" },
				yaml: { line: "#" },
				toml: { line: "#" },
				ini: { line: ";" },
				c: { blockStart: "/*", blockEnd: "*/" },
				cpp: { blockStart: "/*", blockEnd: "*/" },
				java: { blockStart: "/*", blockEnd: "*/" },
				csharp: { blockStart: "/*", blockEnd: "*/" },
				go: { blockStart: "/*", blockEnd: "*/" },
				php: { blockStart: "/*", blockEnd: "*/" },
				css: { blockStart: "/*", blockEnd: "*/" },
				scss: { blockStart: "/*", blockEnd: "*/" },
				less: { blockStart: "/*", blockEnd: "*/" },
				html: { blockStart: "<!--", blockEnd: "-->" },
				xml: { blockStart: "<!--", blockEnd: "-->" },
				vue: { blockStart: "<!--", blockEnd: "-->" },
				rust: { line: "//" },
				swift: { blockStart: "/*", blockEnd: "*/" },
				kotlin: { blockStart: "/*", blockEnd: "*/" },
				scala: { blockStart: "/*", blockEnd: "*/" },
				dart: { blockStart: "/*", blockEnd: "*/" },
			};

			const cs = commentMap[editor.document.languageId] ?? { blockStart: "/*", blockEnd: "*/" };

			function wrapComment(text: string) {
				if (!text.trim()) return "";
				if (cs.blockStart && cs.blockEnd) {
					return `${cs.blockStart}\n${text}\n${cs.blockEnd}\n`;
				} else if (cs.line) {
					return text
						.split("\n")
						.map((l) => `${cs.line} ${l}`)
						.join("\n") + "\n";
				} else {
					return `/*\n${text}\n*/\n`;
				}
			}

			const introBlock = wrapComment(intro);
			const outroBlock = wrapComment(outro);

			// insert intro before selection, outro after selection
			await editor.edit((eb) => {
				eb.insert(selection.start, introBlock);
				eb.insert(selection.end, "\n" + outroBlock);
			});
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() { }
