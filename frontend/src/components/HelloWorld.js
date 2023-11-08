// src/components/HelloWorld.js
import React, { useState, useEffect } from 'react';

function HelloWorld() {
    const [message, setMessage] = useState('');

    useEffect(() => {
    fetch('http://localhost:8000/api/hello') // Use o caminho completo da URL
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch(error => console.error('Error fetching data:', error));
}, []);

    

    return (
        <div>
            <h1>Hello World from Next.js!</h1>
            <p>Message from Laravel: {message}</p>
        </div>
    );
}

export default HelloWorld;
