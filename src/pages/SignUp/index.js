import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import * as Sc from './style';


export default function SignUp() {

    const navigate = useNavigate();

    const [formSignUp, setForm] = useState({
        username: "",
        password: "",
        repeat_password: ""
    });

    useEffect(() => {
        const token = getItem("token");

        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const handleChangeInputValue = (e) => {
        setForm({ ...formSignUp, [e.target.name]: e.target.value });
    };

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();

        try {
            if (!formSignUp.username || !formSignUp.password || !formSignUp.repeat_password) {
                console.log("Please fill all the fields.");
                return;
            }

            if (formSignUp.password !== formSignUp.repeat_password) {
                console.log("The password must match.");
                return;
            }

            const response = await api.post("/users", {
                username: formSignUp.username.trim(),
                password: formSignUp.password.trim(),
            });

            navigate("/sign-in");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Sc.Container>
            <Sc.Left_side />
            <Sc.Right_side>
                <Sc.Title>Cadastre-se</Sc.Title>
                <Sc.Form onSubmit={handleSubmitSignUp} autoComplete={"off"}>
                    <Sc.InputArea>
                        <Sc.Input
                            type={'text'}
                            name={"username"}
                            onChange={handleChangeInputValue}
                            value={formSignUp.username}
                            placeholder='Username' />
                        <Sc.Input
                            type={'password'}
                            name={"password"}
                            onChange={handleChangeInputValue}
                            value={formSignUp.password}
                            placeholder='password' />
                        <Sc.Input
                            type={'password'}
                            name={"repeat_password"}
                            onChange={handleChangeInputValue}
                            value={formSignUp.repeat_password}
                            placeholder='repeat-password' />
                    </Sc.InputArea>
                    <Sc.Button>Cadastrar</Sc.Button>
                </Sc.Form>
                <Link to={"/sign-in"}>Já tem cadastro? Realizar login</Link>
            </Sc.Right_side>
        </Sc.Container>
    )
}