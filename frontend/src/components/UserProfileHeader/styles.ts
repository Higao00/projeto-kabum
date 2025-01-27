import styled from "styled-components";

import { BsFillPersonFill, BsFillPersonVcardFill, BsPower } from "react-icons/bs";
import { Button } from "primereact/button";
import Image from "next/image";

export interface T_UserProfile {
    $userProfile: boolean;
}

export const ContainerUserProfile = styled.div<T_UserProfile>`
    width: 60%;
    height: 130px;

    position: absolute;
    top: 0;
    right: 0;

    transition: 0.4s;

    z-index: 2;

    background-color: ${({ theme }) => theme.background.ternary};

    transform: ${({ $userProfile }) => ($userProfile ? "translate3d(-2rem, 60px, 0px)" : "translate3d(-2rem, -12rem, 0px)")};

    @media only screen and (min-width: 800px) {
        width: 280px;
    }
`;
export const FirstUserProfile = styled.div`
    width: 100%;
    height: 50%;

    padding: 1rem;

    background-color: ${({ theme }) => theme.background.first};

    display: flex;
    align-items: center;
    justify-content: center;
`;
export const FirstUserProfileIcon = styled.div``;

export const FirstUserProfileText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const SecondUserProfile = styled.div`
    width: 100%;
    height: 50%;

    padding: 1rem;

    background-color: ${({ theme }) => theme.background.ternary};

    display: flex;
    align-items: center;
    justify-content: center;
`;
export const IconBsFillPersonFill = styled(BsFillPersonFill)`
    font-size: 2.5rem;
    color: #fff;

    margin-right: 1rem;
`;
export const IconBsPower = styled(BsPower)`
    font-size: 1.5rem;
    color: #fff;
`;

export const IconBsFillPersonVcardFill = styled(BsFillPersonVcardFill)`
    font-size: 1.5rem;
    color: #fff;
`;

export const ButtonLogout = styled(Button)`
    width: 100%;
    height: 35px;

    margin: 0 0.2rem;
`;
export const UserName = styled.p`
    font-size: clamp(1rem, 2vw, 1.2rem);

    margin: 0;

    font-family: ${(props) => props.theme.fonts.bold};
    color: ${(props) => props.theme.color.primary};
`;
export const JobName = styled.p`
    font-size: clamp(1rem, 2vw, 1rem);

    margin: 0;

    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.color.primary};
`;
export const ImageNext = styled(Image)`
    width: 35px;
    height: 35px;
    border-radius: 50px;

    margin-right: 1rem;

    @media only screen and (min-width: 800px) {
        width: 45px;
        height: 45px;
    }
`;
