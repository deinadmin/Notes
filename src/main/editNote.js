const path = require('path');
const { BrowserWindow } = require('electron').remote;
const { dialog } = require('electron')
const { shell } = require('electron')
const ipc = require('electron').ipcRenderer;

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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = firebase.auth().currentUser.uid;
    } else {
      // No user is signed in.
    }
});

ipc.on('note_title', (event, note_title) => {
    document.getElementById('title').value = note_title;
})
ipc.on('note_id', (event, note_id) => {
    document.getElementById('id').value = note_id;
})
ipc.on('note_content', (event, note_content) => {
    document.getElementById('content').value = note_content;
})

const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

cancelBtn.addEventListener('click', (event) => {
    let curWin = BrowserWindow.getFocusedWindow();
    //alert(title);
    curWin.hide();
});

saveBtn.addEventListener('click', (event) => {
    var note_id = document.getElementById('id').value;
    var note_title = document.getElementById('title').value;
    var note_content = document.getElementById('content').value;

    if(note_content == '' || note_title == '') return(alert("Please fill in both fields."));
    var owner = uid;
    var note = {
        id: note_id,
        title: note_title,
        content: note_content,
        owner: owner
    };
    addNoteToDatabase(note);
    let curWin = BrowserWindow.getFocusedWindow();
    curWin.hide();
});

function addNoteToDatabase(n) {
    firebase.database().ref("notes/" + uid + "/" + n.id).set(n);
}