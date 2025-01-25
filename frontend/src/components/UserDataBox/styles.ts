import { Button } from "primereact/button"
import { BsFillPersonFill } from "react-icons/bs"
import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    min-width: 320px;
    min-height: 200px;

    border-radius: 5px;

    background: rgb(79, 117, 180);
    background: linear-gradient(
        0deg,
        rgba(79, 117, 180, 1) 37%,
        rgba(75, 101, 145, 0.9430147058823529) 87%
    );

    @media only screen and (min-width: 800px) {
        padding: 1rem;
    }
`

export const Header = styled.div`
    height: 146px;

    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const ContainerAvatar = styled.div`
    width: 28%;
    height: 146px;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Avatar = styled.div`
    width: 90px;
    height: 90px;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
        border-radius: 100px;
    }
`

export const ContainerInformation = styled.div`
    width: 70%;
    height: 146px;

    padding-left: 0.5rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const ContainerText = styled.div`
    display: flex;
    align-items: center;
`

export const Title = styled.h4`
    font-size: clamp(1rem, 2vw, 1.1rem);

    margin: 0.2rem 0.5rem;

    font-family: ${(props) => props.theme.fonts.bold};
    color: ${(props) => props.theme.color.primary};
`

export const Description = styled.p`
    font-size: clamp(1rem, 2vw, 1.1rem);

    margin: 0.2rem 0.5rem;

    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.color.primary};
`

export const Footer = styled.div`
    width: 100%;
    height: 54px;

    display: flex;
    align-items: center;
    justify-content: space-around;
`

export const ButtonPrimeReact = styled(Button)`
    width: auto;
    height: 35px;

    margin: 0 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.color.primary};

    @media only screen and (min-width: 800px) {
        width: 90px;
    }
`

export const IconBsFillPersonFill = styled(BsFillPersonFill)`
    font-size: 5rem;
    color: #fff;
`
