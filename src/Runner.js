import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function useSocket(url) {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socketIo = io(url)
        setSocket(socketIo)
        function cleanup() {
            socketIo.disconnect()
        }
        return cleanup
    }, [])
    return socket
}


const Runner = () => {
    const socket = useSocket('http://localhost:3000')
    const [statsContainer, setStatsContainer] = useState('')

    useEffect(() => {
        let statsContainer = document.getElementById('stats');

        function handleEvent(payload) {
            console.log('received from server', payload);
        }
        if (socket) {
            socket.on('ranking', handleEvent)
        }
        if (socket) {
            socket.on('news', handleEvent)
        }
        if (socket && statsContainer) {
            let score = statsContainer.innerHTML;
            console.log('message to server', score )
            socket.emit('mes', score)
        }


    }, [socket, statsContainer])

    const itemCount = useRef(null);

    return (
        <div className="bg-primary container">
            <div className="row">
                <div id="app" className="mt-4 col-md-9 p-0"></div>
                <div id="stats" className="mt-4 col-md-3 p-0" ref={itemCount}></div>
            </div>
        </div>
    );
};

export default Runner;

