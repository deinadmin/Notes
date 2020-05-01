const path = require('path');
const { BrowserWindow } = require('electron').remote;
const { dialog } = require('electron')
const { shell } = require('electron')
const ipc = require('electron').ipcRenderer;

const okBtn = document.getElementById('okBtn');

okBtn.addEventListener('click', (event) => {
    let curWin = BrowserWindow.getFocusedWindow();
    curWin.hide();
});

ipc.on('note_title', (event, note_title) => {
    document.getElementById('notetitle').innerHTML = note_title;
})
ipc.on('note_content', (event, note_content) => {
    document.getElementById('notecontent').innerHTML = note_content;
})