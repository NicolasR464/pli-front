import { useEffect, useState } from 'react'

import { connectWebSocket } from '@/utils/constants/connectWebSocket'

const RoomList = (): React.JSX.Element => {
    const [rooms, setRooms] = useState<string[]>([])

    useEffect(() => {
        // Charger les rooms stockées dans le LocalStorage
        const storedRooms = JSON.parse(localStorage.getItem('rooms') || '[]')
        setRooms(storedRooms)

        // Se connecter au WebSocket
        const socket = connectWebSocket()

        // Écouter les messages
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data)
            const roomID = data.roomID

            // Ajouter la room si elle n'existe pas encore
            if (!storedRooms.includes(roomID)) {
                const updatedRooms = [...storedRooms, roomID]
                setRooms(updatedRooms)
                localStorage.setItem('rooms', JSON.stringify(updatedRooms))
            }
        })

        return () => {
            socket.close()
        }
    }, [])

    return (
        <div>
            <h2>{'Rooms disponibles'}</h2>
            <ul>
                {rooms.map((room) => (
                    <li key={room}>{room}</li>
                ))}
            </ul>
        </div>
    )
}

export default RoomList
