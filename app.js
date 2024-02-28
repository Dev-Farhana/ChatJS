// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYYDJ6spGBDnPFktcPUStOmMXWfTDN7ak",
    authDomain: "chatapp-js-23419.firebaseapp.com",
    projectId: "chatapp-js-23419",
    storageBucket: "chatapp-js-23419.appspot.com",
    messagingSenderId: "217356170759",
    databaseURL :  "https://chatapp-js-23419-default-rtdb.firebaseio.com",
    appId: "1:217356170759:web:8f6fd38669ed0d3a74dca2"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const username = prompt("Please Tell Us Your Name");

const messagesRef = ref(database, 'messages');

document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;
    set(ref(database, 'messages/' + Date.now()), {
        name: username,
        text: messageText,
    });
    messageInput.value = '';
});

onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    const messages = Object.values(data);
    const messagesList = document.getElementById('messages');
    messagesList.innerHTML = '';
    messages.forEach((message) => {
        const messageElement = document.createElement('li');
        messageElement.textContent = message.name + ': ' + message.text;
        messageElement.classList.add("bg-indigo-300", "py-2","my-2.5" , "text-xl", "rounded" , "ring-1", "ring-gray-300");
        // messageElement.classList.add("bg-teal-600");
        messagesList.appendChild(messageElement);
    });
});