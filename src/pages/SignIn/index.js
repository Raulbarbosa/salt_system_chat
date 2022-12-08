import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import * as Sc from './style';

export default function Signin() {

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [formSignIn, setForm] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        const token = getItem("token");

        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const handleChangeInputValueSignIn = (e) => {
        setForm({ ...formSignIn, [e.target.name]: e.target.value });
    };

    const handleSubmitSignIn = async (e) => {
        e.preventDefault();

        try {
            if (!formSignIn.username || !formSignIn.password) {
                setError("Please fill all the fields.");
                return;
            }

            const response = await api.post("/login", {
                username: formSignIn.username,
                password: formSignIn.password,
            });

            const { token } = response.data;

            setItem("token", token);

            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
            return;
        }
    };


    return (
        <Sc.Container>
            <Sc.Left_side />
            <Sc.Right_side>
                <Sc.Title>Login</Sc.Title>
                <Sc.Form onSubmit={handleSubmitSignIn} autoComplete={"off"}>
                    <Sc.InputArea>
                        <Sc.Input
                            name={"username"}
                            value={formSignIn.username}
                            type={'text'}
                            onChange={handleChangeInputValueSignIn}
                            placeholder='Username' />
                        <Sc.Input
                            name={"password"}
                            value={formSignIn.password}
                            type={'password'}
                            onChange={handleChangeInputValueSignIn}
                            placeholder='Password' />
                    </Sc.InputArea>
                    <Sc.Button type={'submit'}> Entrar </Sc.Button>
                </Sc.Form>
                <Link to={"/sign-up"}>Não possui conta? Cadastre-se</Link>
            </Sc.Right_side>
        </Sc.Container>
    )
}