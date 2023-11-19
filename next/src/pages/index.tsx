import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GlobalContext } from './_app'
import { io, Socket } from 'socket.io-client'
import {
    GameEvents,
    ServerToClientEvents,
    ClientToServerEvents,
} from '../../../common'
import style from '@/styles/Home.module.css'

export default function HomePage() {
    const [room, setRoom] = useState('')
    const { socket, setSocket } = useContext(GlobalContext)
    const router = useRouter()

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
            'http://eli.local:3001'
        )
        setSocket(socket)

        socket.on(GameEvents.NEW_GAME_CREATED, (roomId: string) => {
            router.push(`/lobby?room=${roomId}`)
        })
    }, [router, setSocket])

    const requestCreateRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        socket?.emit(GameEvents.REQUEST_NEW_GAME)
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`/lobby?room=${room}`)
    }

    return (
        <>
            <Head>
                <title>Wordle WS</title>
            </Head>
            <main className={style.main}>
                <h1> Wordle With Friends </h1>
                <form className={style.roomForm} onSubmit={onSubmit}>
                    <div>
                        <input
                            onChange={(e) => setRoom(e.target.value)}
                            type="text"
                            maxLength={4}
                        />
                        <button type="submit">Join a Room</button>
                    </div>
                    <button onClick={requestCreateRoom}>Create a Room</button>
                </form>
            </main>
        </>
    )
}
