const path = require('path');
const { BrowserWindow } = require('electron').remote;
const { dialog } = require('electron')
const { shell } = require('electron')
const ipc = require('electron').ipcRenderer;

  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDxH5NTREV4etpd6xI6ATcpxu3q6IVO80g",
    authDomain: "notes-1ad8e.firebaseapp.com",
    databaseURL: "https://notes-1ad8e.firebaseio.com",
    projectId: "notes-1ad8e",
    storageBucket: "notes-1ad8e.appspot.com",
    messagingSenderId: "824471493998",
    appId: "1:824471493998:web:fe3753309f6e1e47cab57f",
    measurementId: "G-2MGD2JKJHN"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var uid;
var note_id;
var note_content;
var note_title;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        uid = firebase.auth().currentUser.uid;
        var noteReference = firebase.database().ref().child("notes/" + firebase.auth().currentUser.uid);
        noteReference.on("value", function(snapshot) {
            $("#notes-here").empty();
            var noteHTMLitem = "";
            snapshot.forEach(function(childsnapshot) {
                var note = childsnapshot.val();
                noteHTMLitem += "<div class='noteHTMLitem'>";
                noteHTMLitem += "<h3 class='note-name'>Name: <span class='note-title'>" + note.title + "</span></h3>";
                noteHTMLitem += "<p class='note-content' style='display:none'>" + note.content + "</p>";
                noteHTMLitem += "<button type='button' class='button is-danger delete-note' id='" + note.id + "'>Delete</button>";
                noteHTMLitem += "<button type='button' data-noteid='" + note.id +"' class='button is-info edit-note' id='" + note.id + "' data-toggle='modal' data-target='#editNoteModal'>Edit</button>";
                noteHTMLitem += "<button type='button' data-noteid='" + note.id +"' class='button is-success view-note' id='" + note.id + "' >View Note</button>";
                noteHTMLitem += "<hr></div>";
            });
            $("#notes-here").html(noteHTMLitem);

            
        });
    } else {
        setTimeout(function () {
            let curWin = BrowserWindow.getFocusedWindow();
            let win = new BrowserWindow({
                width: 300, 
                height: 350,
                webPreferences: {
                    nodeIntegration: true,
                },
                resizable: false,
                fullscreenable: false,
                fullscreen: false,
                maximizable: false
            })
            win.on('closed', () => {
                win = null
            })
            win.loadFile(`${__dirname}/../index.html`);
            win.once('ready-to-show', () => {
                win.show()
            })
            curWin.close();
        }, 1000)
    }
  });

const logoutBtn = document.getElementById('logOut');
const newNote = document.getElementById('newNote');

logoutBtn.addEventListener('click', (event) => {
    firebase.auth().signOut();
});

$(document).on("click", ".delete-note", function() {
    var noteId = $(this).attr("id");
    firebase.database().ref("notes/" + uid + "/" + noteId).remove();
});

$(document).on("click", ".edit-note", function() {
    note_id = $(this).attr("data-noteid");
    note_title = $(this).parent().find(".note-title").text();
    note_content = $(this).parent().find(".note-content").text();
    let curWin = BrowserWindow.getFocusedWindow();
    let win = new BrowserWindow({
        width: 300, 
        height: 350,
        webPreferences: {
            nodeIntegration: true,
        },
        resizable: false,
        fullscreenable: false,
        fullscreen: false,
        maximizable: false,
        parent: curWin,
        modal: true
    })
    win.on('closed', () => {
        win = null
    })
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('note_title', note_title);
        win.webContents.send('note_id', note_id);
        win.webContents.send('note_content', note_content);
    });
    win.loadFile(`${__dirname}/editNote.html`);
    win.once('ready-to-show', () => {
        win.show()
    })
});

newNote.addEventListener('click', (event) => {
    let curWin = BrowserWindow.getFocusedWindow();
    let win = new BrowserWindow({
        width: 300, 
        height: 350,
        webPreferences: {
            nodeIntegration: true,
        },
        resizable: false,
        fullscreenable: false,
        fullscreen: false,
        maximizable: false,
        parent: curWin,
        modal: true
    })
    win.on('closed', () => {
        win = null
    })
    win.loadFile(`${__dirname}/newNote.html`);
    win.once('ready-to-show', () => {
        win.show()
    })
});

$(document).on("click", ".view-note", function() {

    var note_title = $(this).parent().find(".note-title").text();
    var note_content = $(this).parent().find(".note-content").text();

    let curWin = BrowserWindow.getFocusedWindow();
    let win = new BrowserWindow({
        width: 300, 
        height: 350,
        webPreferences: {
            nodeIntegration: true,
        },
        resizable: false,
        fullscreenable: false,
        fullscreen: false,
        maximizable: false,
        parent: curWin,
        modal: true
    })
    win.on('closed', () => {
        win = null
    })
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('note_title', note_title);
        win.webContents.send('note_content', note_content);
    });
    win.loadFile(`${__dirname}/viewNote.html`);
    win.once('ready-to-show', () => {
        win.show()
    })
    
});