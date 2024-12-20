const fileSystem = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
	// const notes = require('./db.json');
	// const note = {
	// 	title,
	// 	id: Date.now().toString()
	// };

	// notes.push(note);

	// await fileSystem.writeFile(notesPath, JSON.stringify(notes));

	// const buffer = await fileSystem.readFile(notesPath)
	// const notes = Buffer.from(buffer).toString('utf-8')
	const notes = await getNotes();

	const note = {
		title,
		id: Date.now().toString()
	};
	notes.push(note);

	await saveNotes(notes);

	console.log(chalk.greenBright.inverse('Note was added'));
    printNotes();
}

async function saveNotes(notes) {
	await fileSystem.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
	const notes = await fileSystem.readFile(notesPath, { encoding: 'utf-8' });
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
	const notes = await getNotes();

	console.log(chalk.blueBright.inverse('Here is the list of notes:'));

	notes.forEach(({ id, title }) => {
		console.log(chalk.blue(id, title));
	});
}

async function removeNote(removeId) {
	const notes = await getNotes();

	const notesWithoutRemovedNote = notes.filter(({ id }) => id !== removeId);

	await saveNotes(notesWithoutRemovedNote);

	console.log(chalk.redBright.inverse(`Title ${removeId} was removed`));
	printNotes();
}

module.exports = {
	addNote,
	removeNote,
	printNotes
};
