import { ArrowCounterClockwise, SignOut } from 'phosphor-react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo_salt.png';
import api from '../../services/api';
import { getItem, removeItem } from '../../utils/storage';
import * as Sc from './style';
import socket from '../../socket';


export default function Dashboard() {

    const [user, setUser] = useState({
        username: '',
        id: ''
    });
    const [message, setMessage] = useState('');
    const [target, setTarget] = useState('');
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [checker, setChecker] = useState();
    const allMessagesArea = useRef(null);

    const navigate = useNavigate();

    const initializatorSocket = () => {
        socket.on('send_message', socket => {
            setChecker(socket)
            getDirectMessage();
        })
    }

    const getUser = async () => {
        try {
            const response = await api.get("/user", {
                headers: {
                    Authorization: `Bearer ${getItem('token')}`
                }
            });

            setUser(response.data);

        } catch (error) {
            logout();
        }
    }

    const getAllUsers = async () => {
        try {
            const response = await api.get("/users", {
                headers: {
                    Authorization: `Bearer ${getItem('token')}`
                }
            });

            setUsers(response.data);

        } catch (error) {
            logout();
        }
    }

    const logout = () => {
        removeItem('token');
        socket.disconnect();
        navigate('/sign-in');
    }

    useEffect(() => {
        getUser()
        getAllUsers()
        initializatorSocket()
    }, [])

    useEffect(() => {
        getDirectMessage()
    }, [target, checker])

    const sendMessage = async () => {

        if (!target || !message) {
            return;
        }
        const data = {
            sender: user.username,
            target,
            content: message
        }

        try {
            const response = await api.post("/messages",
                { target: target, content: message },
                {
                    headers: {
                        Authorization: `Bearer ${getItem('token')}`
                    }
                }
            );

            socket.emit("send_message", () =>
                console.log('message sent')
            );

            setMessage('');
            getDirectMessage();

        } catch (error) {
            return;
        }

    };

    const scrollToBottom = () => {
        if (!allMessagesArea.current) {
            return;
        } else {
            allMessagesArea.current.scroll(1, 50000)
        }
    }

    const functionteste = (username) => {
        setTarget('')
        setTarget(username)
        scrollToBottom()
    }

    const getDirectMessage = async () => {
        try {
            const response = await api.get(`messages/${target}`, {
                headers: {
                    Authorization: `Bearer ${getItem('token')}`
                }
            });
            setMessages(response.data);
            scrollToBottom()

        } catch (error) {
            // logout();
            console.log(error.message);
        }
    }

    return (
        <Sc.Container>
            <Sc.Header>
                <Sc.Image src={Logo} />
                <Sc.LogoutArea>
                    <Sc.UserName >Bem vindo, {user.username}</Sc.UserName>
                    <SignOut size={32} cursor={'pointer'} onClick={logout} />
                </Sc.LogoutArea>
            </Sc.Header>
            <Sc.MainContent>
                <Sc.Left_side>
                    <Sc.Title>Usuários</Sc.Title>
                    <ArrowCounterClockwise
                        style={{
                            position: 'absolute',
                            right: '1rem', top: '1rem'
                        }}
                        size={32}
                        onClick={() => setTarget('')}
                    />
                    <Sc.UsersContent>
                        {users.map(item => {
                            if (item.username === user.username) {
                                return
                            } else {
                                return (
                                    <Sc.User
                                        key={item.id}
                                        onClick={() => { functionteste(item.username) }}
                                    >{item.username}
                                    </Sc.User>
                                )
                            }
                        })}
                    </Sc.UsersContent>
                </Sc.Left_side>
                <Sc.Right_side >
                    {target &&
                        <>
                            <Sc.MessagesAreaView ref={allMessagesArea}>
                                {
                                    messages.map((item) => {
                                        return (
                                            <Sc.Message key={item.id}>
                                                <Sc.MessageOwner>
                                                    {item.sender_id === user.id ? user.username : target}:
                                                </Sc.MessageOwner>
                                                <Sc.MessageContent>
                                                    {item.content}
                                                </Sc.MessageContent>
                                            </Sc.Message>
                                        )
                                    })}

                            </Sc.MessagesAreaView>
                            <Sc.MessageAreaTextInput>
                                <Sc.Input
                                    value={message}
                                    placeholder='Digite aqui sua mensagem...'
                                    onChange={(event) => {
                                        setMessage(event.target.value);
                                    }}
                                />
                                <Sc.ButtonSend onClick={sendMessage}>Enviar</Sc.ButtonSend>
                            </Sc.MessageAreaTextInput>
                        </>
                    }
                </Sc.Right_side>
            </Sc.MainContent>
        </Sc.Container>
    )
}