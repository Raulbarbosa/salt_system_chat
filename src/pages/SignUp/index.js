import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import * as Sc from './style';


export default function SignUp() {

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [formSignUp, setForm] = useState({
        name: "",
        email: "",
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
        setError('');
    };

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();

        try {
            if (!formSignUp.name || !formSignUp.email || !formSignUp.password || !formSignUp.repeat_password) {
                setError("Please fill all the fields.");
                return;
            }

            if (formSignUp.password !== formSignUp.repeat_password) {
                setError("The password must match.");
                return;
            }

            const response = await api.post("/users", {
                name: formSignUp.name.trim(),
                email: formSignUp.email.trim(),
                password: formSignUp.password.trim(),

            });

            navigate("/sign-in");
        } catch (error) {
            setError(error.response.data.message);
            return;
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
                            name={"name"}
                            onChange={handleChangeInputValue}
                            value={formSignUp.name}
                            placeholder='name' />
                        <Sc.Input
                            type={'email'}
                            name={"email"}
                            onChange={handleChangeInputValue}
                            value={formSignUp.email}
                            placeholder='email' />
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
                    {error &&
                        <Sc.ErrorMessage>
                            {error}
                        </Sc.ErrorMessage>
                    }
                    <Sc.Button>Cadastrar</Sc.Button>
                </Sc.Form>
                <Link to={"/sign-in"}>Já tem cadastro? Realizar login</Link>
            </Sc.Right_side>
        </Sc.Container>
    )
}