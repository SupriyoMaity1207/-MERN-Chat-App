import React, { useEffect } from 'react';
import socketIo from 'socket.io-client';
import { user } from './Join';
import ChatMessage from '../Components/Chat_area';
import './Chat.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import user_pic from '../assets/logo.jpg'

let socket;
const ENDPOINT = "http://localhost:5000/";

function Chat() {
    const [id, setId] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const send = (message) => {
        // Check if message is empty
        if (!message) {
            console.log("Message cannot be empty");
            return;
        }

        // Emit the chat message
        socket.emit('chatMessage', { message, id });

        // Clear the input field
        document.getElementById('messageInput').value = '';
    }

    const handleclick = () => {
        const message = document.getElementById('messageInput').value;
        send(message);
    }
    const handlekeypress = (event) => {

        if (event.key === 'Enter') {
            const message = document.getElementById('messageInput').value;
            // Call your function to send the message
            send(message);
        }
    }

    useEffect(() => {
        // Create socket connection
        socket = socketIo(ENDPOINT, { transports: ["websocket"] });

        // Event listener for socket connection
        socket.on("connect", () => {
            setId(socket.id)
            alert("Connected to server"); // Alert once when connected
        });

        // Emit 'joined' event when component mounts
        socket.emit('joined', { user });

        // Event listeners for welcome and userjoined events
        socket.on('welcome', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message);
        });

        socket.on('userjoined', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message);
        });

        socket.on('userleft', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message);
        });
        // Cleanup function to close the socket connection when component unmounts
        return () => {
            socket.disconnect();
            socket.off();
        };
    }, []); // Empty dependency array ensures this effect runs only once

    useEffect(() => {

        socket.on('sendMessage', (data) => {
            setMessages([...messages, data])
            console.log( data.id, data.message)
        })
        return () => {
            socket.off();
        }

    }, [messages]) 
    return (

        <div className="container">
            <div className="header">
                <h1>ChatApp</h1>
                <div className="userdetails">
                    <i class="fa-solid fa-user"></i>
                    <p>{user}</p>
                    <i class="fa-solid fa-angle-down"></i>
                </div>
            </div>
            <div className="chat">
                <div className="right_chat">
                    <div className="header_right_chat">
                        <img src={user_pic} alt="" /> 
                        <p>{user}</p>
                    </div>
                    <ScrollToBottom className="see_sms">
                        {messages.map((item, i) => (
                            <ChatMessage key={i} message={item.message} classs={item.id === id ? 'right' : 'left'} user={item.id === id ? "" : item.user} />
                        ))}
                    </ScrollToBottom>

                    <div id="send_sms">
                        <input type="text" placeholder='Send message' id='messageInput' onKeyPress={handlekeypress} />
                        <span className="material-symbols-outlined" id='btn' onClick={handleclick}>send</span>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default Chat;
