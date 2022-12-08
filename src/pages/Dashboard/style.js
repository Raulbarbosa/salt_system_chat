import styled from "styled-components";

export const Container = styled.div`
    box-sizing: border-box;

    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;

`
export const Header = styled.div`
    width: 100vw;
    height: 10vh;

    background-color: #2980B9;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 0 3rem;
`

export const Image = styled.img`
    width: 10rem;
    height: 2rem;
`

export const LogoutArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 20vw;
`

export const UserName = styled.h2`
`

export const MainContent = styled.div`
    display: flex;

    box-sizing: border-box;
    width: 100vw;
    height: calc(100vh - 10vh);
`


export const Left_side = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;

    border-right:  0.3rem solid #9CDADA;

    gap: 1rem;

    width: 30vw;
    height: calc(100vh - 10vh);

    padding: 1.6rem;

`

export const Title = styled.h1`
    width: 7rem;
    text-align: center;
`

export const UsersContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 1rem;
    gap: 1rem;
    border-top:  0.3rem solid #9CDADA;

    background-color: white;
    width: 29vw;
    height: 80vh;

    overflow: auto;

    &:overflow {
        color: #9CDADA;
    }
`

export const User = styled.h2`
    width: 20vw;
    text-align: center;


    &:hover{
        background-color: #c0e8e8;
    }

    &:focus {
        background-color: #9CDADA;
    }

`



export const Right_side = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 2.5vh 0;

    width: 70vw;
    height: calc(100vh - 10vh);

`

export const MessagesAreaView = styled.div`
    display: flex;
    flex-direction: column;

    padding: 2rem;

    border: 0.1rem solid #9CDADA;


    width: 60vw;
    height: 70vh;

    border-radius: 1.2rem 1.2rem 0 0;



    overflow: auto;

`

export const Message = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const MessageOwner = styled.h2`

`

export const MessageContent = styled.span`
    resize: none;

    margin-left: 1rem;

    width: 50vw;
    height: 8vh;
    max-height: 10vh;

    padding: 0.4rem;
    margin-bottom: 1rem;

    border-radius: 0.6rem;

    border: 0.1rem solid #9CDADA;

    background-color: white;

`

export const MessageAreaTextInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 1rem;

    border: 0.1rem solid #9CDADA;

    width: 60vw;
    height: 15vh;

    border-radius: 0 0 1.2rem 1.2rem;
`

export const Input = styled.textarea`
    width: 50vw;
    height: 10vh;
    overflow: hidden;
    resize: none;

    padding: 0.8rem;

    border-radius: 0.6rem;

    border: 0.1rem solid #9CDADA;
`

export const ButtonSend = styled.button`
    width: 5rem;
    height: 5rem;

    background-color: #9CDADA;

    border: none;
    
    border-radius: 50%;

    &:hover{
        cursor: pointer;
        background-color: #3ba0a0;

    }
`
