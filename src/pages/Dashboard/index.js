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
    // const [bot, setBot] = useState(false);
    // const [botMessages, setBotMessages] = useState([])
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

        try {
            await api.post("/messages",
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

        } catch (error) {
            return;
        } finally {
            setMessage('');
            getDirectMessage();
        }

    };
    // const sendMessageBot = async () => {
    //     const localBotMessages = { ...botMessages };
    //     try {
    //         const response = await api.post("/bot",
    //             { content: message },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${getItem('token')}`
    //                 }
    //             }
    //         );

    //         socket.emit("send_message", () =>
    //             console.log('message sent')
    //         );

    //         localBotMessages.push(response.data);

    //         console.log("Oi", localBotMessages);

    //         setBotMessages(localBotMessages)

    //     } catch (error) {
    //         return;
    //     } finally {
    //         setMessage('');
    //     }

    // };

    const scrollToBottom = () => {
        if (!allMessagesArea.current) {
            return;
        } else {
            allMessagesArea.current.scroll(1, 50000)
        }
    }

    const talkStart = (param) => {
        setTarget('')
        // setBot(false);
        setTarget(param)
        scrollToBottom()
    }

    // const talkBot = () => {
    //     setTarget('');
    //     setBot(true);
    // }

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
            logout();
            // console.log(error.message);
        }
    }

    return (
        <Sc.Container>
            <Sc.Header>
                <Sc.Image src={Logo} />
                <Sc.LogoutArea>
                    <Sc.UserName >Bem vindo, {user.name}</Sc.UserName>
                    <SignOut size={32} cursor={'pointer'} onClick={logout} />
                </Sc.LogoutArea>
            </Sc.Header>
            <Sc.MainContent>
                <Sc.Left_side>
                    {/* <Sc.BotTitle>
                        <Sc.Title onClick={() => {
                            talkBot()
                        }}>Bot</Sc.Title>
                        <ArrowCounterClockwise
                            style={{
                                position: 'absolute',
                                right: '0rem', top: '0rem'
                            }}
                            size={32}
                            onClick={() => { setBot(false) }}
                        />
                    </Sc.BotTitle> */}
                    <Sc.UsersTitle>
                        <Sc.Title>Usuários</Sc.Title>
                        <ArrowCounterClockwise
                            style={{
                                position: 'absolute',
                                right: '0rem', top: '0rem'
                            }}
                            size={32}
                            onClick={() => setTarget('')}
                        />
                    </Sc.UsersTitle>
                    <Sc.UsersContent>
                        {users.map(item => {
                            if (item.email === user.email) {
                                return
                            } else {
                                return (
                                    <Sc.User
                                        key={item.id}
                                        onClick={() => { talkStart(item.email) }}
                                    >{item.email}
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
                                                    {item.sender_id === user.id ? user.email : target}:
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
                    {/* {bot &&
                        <>
                            <Sc.MessagesAreaView>
                                {
                                    botMessages.map((item) => {
                                        return (
                                            <Sc.Message key={item.id}>
                                                <Sc.MessageOwner>
                                                    {item.sender_id === user.id ? user.email : 'bot'}:
                                                </Sc.MessageOwner>
                                                <Sc.MessageContent>
                                                    {item}
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
                                <Sc.ButtonSend onClick={sendMessageBot}>Enviar</Sc.ButtonSend>
                            </Sc.MessageAreaTextInput>
                        </>} */}
                </Sc.Right_side>
            </Sc.MainContent>
        </Sc.Container>
    )
}