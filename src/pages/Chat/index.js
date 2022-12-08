import { useState } from 'react';
import socket from '../../socket';

export default function Chat() {

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        socket.emit("send_message", { message });
    };

    return (
        <div style={{ width: '100vw', height: '90vh' }}>
            <h1>Bem vindo ao chat</h1>
            <input
                placeholder="Message..."
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
            />
            <button onClick={sendMessage}> Send Message</button>
        </div>
    )
}