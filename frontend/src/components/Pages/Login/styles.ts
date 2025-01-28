import styled from "styled-components";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

interface T_ContainerForm {
    width?: string;
}

interface T_ContainerLinkForgotLogin {
    justifyContent?: string;
}

export const Container = styled.section`
    height: 100vh;

    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    background: url("https://img.freepik.com/vetores-gratis/fundo-de-tecnologia-digital-de-fio-de-rede_1017-27428.jpg?t=st=1737842639~exp=1737846239~hmac=a5bc16496d640ec957395ed5a4a54993f8cdb76efbefdc853f558b88b14632ba&w=826");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
`;
export const ContainerHeader = styled.div`
    width: 100%;
    height: 60px;

    position: absolute;
    top: 0;
    left: 0;
`;
export const ContainerLogin = styled.div`
    width: 95%;
    height: calc(100vh - 60px);

    margin-top: 65px;

    border-radius: 10px;

    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;

    @media only screen and (min-width: 800px) {
        width: 70%;
        height: 72vh;

        min-height: 72vh;

        flex-direction: row;
    }
`;
export const ContainerLoginFirst = styled.div`
    width: 92%;
    height: auto;

    border-radius: 10px;

    border-top-right-radius: 0px;
    border-top-left-radius: 0px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.background.second};

    @media only screen and (min-width: 800px) {
        width: 40%;
        height: 90%;

        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }
`;
export const ContainerLoginSecond = styled.div`
    width: 100%;
    height: 55%;

    min-height: 420px;

    border-radius: 10px;

    padding: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.background.secondary};

    @media only screen and (min-width: 800px) {
        width: 60%;
        height: 100%;
    }
`;
export const ContainerLogo = styled.div`
    /* display: none; */

    @media only screen and (min-width: 800px) {
        display: block;

        width: 280px;
        height: 70px;
    }
`;
export const ContainerDialog = styled.div`
    width: 80vw;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 800px) and (max-width: 1600px) {
        width: 40vw;
    }

    @media (min-width: 1600px) and (max-width: 2200px) {
        width: 30vw;
    }

    @media (min-width: 2200px) {
        width: 20vw;
    }
`;
export const ContainerDialogTerm = styled(ContainerDialog)`
    @media (min-width: 800px) and (max-width: 1600px) {
        width: 65vw;
    }

    @media (min-width: 1600px) and (max-width: 2200px) {
        width: 55vw;
    }

    @media (min-width: 2200px) {
        width: 45vw;
    }
`;
export const ContainerForm = styled.form<T_ContainerForm>`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    div,
    span {
        width: 100%;
    }

    input {
        width: 100%;
        cursor: pointer;
    }

    label,
    small {
        font-family: ${(props) => props.theme.fonts.medium};
        color: ${(props) => props.theme.color.primary};
    }

    small {
        color: red;
    }

    .label-input-login,
    small {
        line-height: 1.5;
        margin: 0 0.2rem;
    }

    small {
        text-align: right;
    }

    @media only screen and (min-width: 1650px) {
        width: ${({ width }) => (width ? width : "60%")};
        height: 45%;
    }

    @media only screen and (min-width: 600px) and (max-width: 1650px) {
        width: ${({ width }) => (width ? width : "80%")};
        height: 60%;
    }
`;
export const TitleInfo = styled.h2`
    font-size: clamp(2rem, 2vw, 2rem);

    margin: 0.5rem 1rem;

    line-height: 1.4;

    font-family: ${(props) => props.theme.fonts.bold};
    color: ${(props) => props.theme.color.primary};

    text-align: center;

    @media only screen and (min-width: 800px) {
        font-size: clamp(1rem, 2vw, 1.5rem);
    }
`;
export const TitleInfoFieldService = styled.h2`
    font-size: clamp(1.3rem, 2vw, 2rem);

    margin: 0.5rem 1rem;

    line-height: 1.4;

    font-family: ${(props) => props.theme.fonts.bold};
    color: ${(props) => props.theme.color.primary};

    text-align: center;

    @media only screen and (min-width: 800px) {
        font-size: clamp(1rem, 2vw, 2rem);
    }
`;
export const TextInfo = styled.h2`
    font-size: clamp(1rem, 2vw, 1rem);

    margin: 0.5rem 1rem;

    line-height: 1.6;

    font-family: ${(props) => props.theme.fonts.light};
    color: ${(props) => props.theme.color.primary};

    text-align: center;
`;
export const InputTextLogin = styled(InputText)`
    width: 100%;
`;
export const PasswordLogin = styled(Password)`
    width: 100%;

    .p-input-icon {
        display: flex;
        justify-content: flex-end;
    }
`;
export const ContainerLinkForgotLogin = styled.div<T_ContainerLinkForgotLogin>`
    width: 100%;
    height: 110px;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : "space-between")};

    @media only screen and (min-width: 800px) {
        width: 48%;
        height: auto;
        flex-direction: row;
    }
`;
export const ButtonLogin = styled(Button)`
    width: 100%;

    @media only screen and (min-width: 800px) {
        width: 48%;
    }
`;
export const LinkForgotLogin = styled(Button)`
    width: 100%;

    @media only screen and (min-width: 800px) {
        width: 48%;
    }
`;
export const InputTextAreaExtendsV = styled.div`
    width: 100%;
    height: 60vh;

    overflow: auto;
`;
