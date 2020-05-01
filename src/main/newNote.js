const path = require('path');
const { BrowserWindow } = require('electron').remote;
const { dialog } = require('electron')
const { shell } = require('electron')

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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = firebase.auth().currentUser.uid
    } else {
      // No user is signed in.
    }
});

const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

cancelBtn.addEventListener('click', (event) => {
    let win = BrowserWindow.getFocusedWindow();
    win.close();
});

saveBtn.addEventListener('click', (event) => {
    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;

    if(title == '' || content == '') return(alert('You need to fill out both fields.'))
    var owner = uid;
    var note = {
        id: Date.now() + owner,
        title: title,
        content: content,
        owner: owner
    }
    addNoteToDatabase(note);
    let curWin = BrowserWindow.getFocusedWindow();
    curWin.hide();
});

function addNoteToDatabase(n) {
    firebase.database().ref("notes/" + firebase.auth().currentUser.uid + "/" + n.id).set(n);
}