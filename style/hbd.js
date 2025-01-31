// Fake static data for chat messages (both user and bot)
const fakeMessages = [
    { sender: 'bot', message: 'halllooooo, tadi kan udah aku ngasih doa ya buat yang ulang tahun.' },
    { sender: 'bot', message: 'Sekarang giliran kamu berdoa buat diri kamu sendiri, tapi di ketik disini nanti kamu kirim,' },
    { sender: 'bot', message: 'Semoga doa nya sampeeee,maaf cuma bisa ngasih kaya ginian doang sama doa yang pasti.. ' },
];

// Function to render chat messages
function renderChatMessages() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Clear the chat box before adding messages
    
    // Loop through the fakeMessages array and display each message
    fakeMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', msg.sender);
        messageDiv.textContent = msg.message;
        chatBox.appendChild(messageDiv);
    });

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to handle automatic scrolling
function autoScroll() {
    const inputField = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');

    inputField.addEventListener('input', () => {
        // Scroll chat box to bottom when typing
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Function to format date as tgl-bulan-tahun jam:menit:detik
function formatTimestamp() {
    const now = new Date();
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0 for January, so we add 1
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

// Function to handle sending message and saving it to a file (on the server)
function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const userMessage = inputField.value.trim();

    if (userMessage !== '') {
        // Add user's message to fakeMessages array
        fakeMessages.push({ sender: 'user', message: userMessage });

        // Render updated messages
        renderChatMessages();

        // Clear the input field
        inputField.value = '';

        // Prepare message and timestamp in desired format
        const timestamp = formatTimestamp();
        const messageData = {
            message: userMessage,
            timestamp: timestamp
        };

        // Send the message to the server
        saveMessageToServer(messageData);
        
        // Delay the bot's response
        setTimeout(() => {
            const botMessage = 'Aamiin semoga doa nya terkabulkan yaa sekali lagi selamat ulang tahunnnn';
            fakeMessages.push({ sender: 'bot', message: botMessage });
            renderChatMessages();

            // Redirect to album.php after 10 seconds
            setTimeout(() => {
                window.location.href = 'album.php';
            }, 8000); // Redirect after 10 seconds
        }, 1000); // Delay bot's response by 1 second
    }
}

// Function to send message to the server (save in doa.txt on local server)
function saveMessageToServer(data) {
    fetch('save_message.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Send message and timestamp as JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message saved:', data);
    })
    .catch(error => {
        console.error('Error saving message:', error);
    });
}

// Event listener for the "Send" button
document.getElementById('send-btn').addEventListener('click', sendMessage);

// Event listener for pressing Enter to send the message
document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initial render of chat messages and auto scroll setup
renderChatMessages();
autoScroll();
