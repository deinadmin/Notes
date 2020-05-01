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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let curWin = BrowserWindow.getFocusedWindow();
        let win = new BrowserWindow({
            width: 1100, 
            height: 600,
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
        win.loadFile(`${__dirname}/main/main.html`);
        win.once('ready-to-show', () => {
            win.show()
        })
        curWin.close();
    } else {
      
    }
});

const createAcc = document.getElementById('createAcc');
const loginBtn = document.getElementById('loginBtn');


createAcc.addEventListener('click', (event) => {
    shell.openExternal('https://mybulli.tk/signup')

    
});

loginBtn.addEventListener('click', (event) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage);
    });
});