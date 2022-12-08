import styled from 'styled-components';
import Login_image from '../../assets/login-image.png'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;
    
`

export const Left_side = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50vw;
    min-height: 100vh;

    background-image: url(${Login_image});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`

export const Right_side = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
   
    width: 50vw;
    height: 100vh;
    padding-top: 5rem;

    background-color: white;
`

export const Title = styled.h1`
    margin-bottom: 3rem;
`

export const Form = styled.form`

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 24rem;
    height: 32rem;

    background-color: #9CDADA;

    border-radius: 0.8rem;
    margin-bottom: 1.6rem;
`
export const Input = styled.input`
    all: unset;

    color: white;
    border: .1rem solid #222525;
    background-color: #3a4040;

    height: 2.6rem;
    width: 15rem;
    padding: 0.3rem 1.2rem;

    font-size: 2.4rem;
    border-radius: .8rem;
    margin-top: .4rem;


    &::placeholder {
        font-size: 1.6rem;
        text-align: center;
    }

    &:focus {
        scale: 1.05;
        border: 0.1rem solid white;
    }
`

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 7rem;

`

export const Button = styled.button`
    all: unset;

    border: 0.1rem solid #2ecc70;
    background-color: #1b7942;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 4.0rem;
    max-width: 7rem;
    width: 7rem;
    padding: 0.4rem 1.2rem;

    font-size: 2.4rem;
    border-radius: 0.8rem;

    color: white;


    &:hover {
    cursor: pointer;
    scale: 1.05;
}
`