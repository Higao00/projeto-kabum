import styled from "styled-components";
import Image from "next/image";
import { BsFillSunFill, BsFillMoonStarsFill, BsXLg, BsList, BsFillPersonFill } from "react-icons/bs";
import { Dropdown } from "primereact/dropdown";

interface T_ContainerSide {
    $menuSide: boolean | null;
}

interface T_TitleSideMenu {
    $level: number;
}

interface T_ContainerLinkSideMenu {
    $level: number;
}

export const ContainerTop = styled.header`
    height: 60px;

    padding: 0.5rem;

    z-index: 2;

    background-color: ${(props) => props.theme.background.primary};

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: solid 1px ${(props) => props.theme.background.ternary};

    box-shadow: rgba(0, 0, 0, 0.03) 0px 4px 10px, rgba(0, 0, 0, 0.06) 0px 0px 2px, rgba(0, 0, 0, 0.12) 0px 2px 6px;

    @media only screen and (min-width: 800px) {
        padding: 1rem;
    }
`;
export const ContainerSide = styled.div<T_ContainerSide>`
    width: 100%;
    height: calc(100vh - 60px);

    position: absolute;

    overflow: auto;

    padding: 0.5rem 2rem;

    transition: 0.5s;

    z-index: 1;

    background-color: ${(props) => props.theme.background.primary};

    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);

    border-right: solid 1px ${(props) => props.theme.background.ternary};

    ::-webkit-scrollbar {
        width: 3px;
        height: 3px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
        padding: 2px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.background.ternary};
    }

    @media only screen and (max-width: 800px) {
        transform: ${({ $menuSide }) => ($menuSide ? "translate3d(0px, 0px, 0px)" : "translate3d(-120vw, 0px, 0px)")};
    }

    @media only screen and (min-width: 800px) {
        width: 250px;

        transform: ${({ $menuSide }) => ($menuSide ? "translate3d(0px, 0px, 0px)" : "translate3d(-400px, 0px, 0px)")};
    }
`;
export const ContainerSideMenu = styled.div``;

export const ContainerSideMenuSelect = styled.div`
    width: 100%;
    height: 40px;

    margin-bottom: 3rem;
`;
export const DropdownExtend = styled(Dropdown)`
    width: 100%;
    background: transparent;
    border: 0;

    border-bottom: solid 1px #6e6e6e;

    span {
        font-family: ${(props) => props.theme.fonts.regular} !important;
        color: ${(props) => props.theme.color.primary} !important;
        font-size: 1rem !important;
    }
`;
export const TitleSideMenu = styled.h2<T_TitleSideMenu>`
    font-size: clamp(1rem, 2vw, 1.1rem);

    font-family: ${(props) => props.theme.fonts.bold};
    color: ${(props) => props.theme.color.primary};

    margin: ${({ $level }) => ($level ? "1.2rem " + `${$level}rem` : "1.2rem 0.5rem")};
`;
export const ContainerTextLinkMenu = styled.div`
    border-bottom: solid 1px #6e6e6e;
`;
export const ContainerLinkSideMenu = styled.div`
    width: 100%;
    height: auto;

    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;

    border-radius: 50px;

    margin: 0.5rem 0;

    padding: 0 1rem;

    :hover {
        background: ${(props) => props.theme.background.ternary};
    }
`;
export const LinkSideMenu = styled.p`
    font-size: clamp(1rem, 2vw, 1rem);

    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.color.primary};

    margin: 0.5rem 1rem;
`;
export const ContainerImageLogo = styled.div`
    width: calc(100vw - 115px);

    display: flex;

    align-items: center;
    justify-content: center;

    @media only screen and (min-width: 800px) {
        width: 205px;

        margin-left: 1rem;
    }
`;
export const ContainerSideMenuButton = styled.div`
    width: 30px;
    height: 30px;

    border-radius: 100px;

    cursor: pointer;

    background: ${({ theme }) => theme.background.ternary};

    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.8s;

    :hover {
        transform: scale(1.08);
    }

    @media only screen and (min-width: 800px) {
        width: 40px;
        height: 40px;
    }
`;
export const LeftContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;

    width: calc(100% -100px);

    @media only screen and (min-width: 800px) {
        flex-direction: row;
        width: 250px;
    }
`;
export const RightContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const ContainerThemeChange = styled.div`
    width: 30px;
    height: 30px;

    border-radius: 100px;

    cursor: pointer;

    background: ${({ theme }) => theme.background.secondary};

    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (min-width: 800px) {
        width: 40px;
        height: 40px;
    }
`;
export const ContainerSocialMedia = styled.div<T_ContainerSide>`
    width: 100%;
    height: 50px;

    padding: 0 2rem;

    position: fixed;
    bottom: 0;

    z-index: 2;

    transition: 0.5s;

    margin-top: 1rem;

    display: flex;
    align-items: center;
    justify-content: space-around;

    background-color: ${(props) => props.theme.background.primary};

    border-top: solid 1px ${(props) => props.theme.background.ternary};

    transition: 0.5s;

    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);

    border-right: solid 1px ${(props) => props.theme.background.ternary};

    a {
        transition: 0.4s;
        :hover {
            transform: scale(1.1);
        }
    }

    @media only screen and (max-width: 800px) {
        transform: ${({ $menuSide }) => ($menuSide ? "translate3d(0px, 0px, 0px)" : "translate3d(-120vw, 0px, 0px)")};
    }

    @media only screen and (min-width: 800px) {
        width: 340px;

        transform: ${({ $menuSide }) => ($menuSide ? "translate3d(0px, 0px, 0px)" : "translate3d(-400px, 0px, 0px)")};
    }
`;
export const ContainerUserNoGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    h1,
    p {
        text-align: center;
    }
`;
export const IconBsFillSunFill = styled(BsFillSunFill)`
    font-size: 1rem;
    color: #fff;
`;
export const IconBsFillMoonStarsFill = styled(BsFillMoonStarsFill)`
    font-size: 1rem;
    color: #fff;
`;
export const IconBsFillPersonFill = styled(BsFillPersonFill)`
    font-size: 1rem;
    color: #fff;
`;
export const IconBsList = styled(BsList)`
    font-size: 1rem;
    color: #fff;
`;
export const IconBsXLg = styled(BsXLg)`
    font-size: 1rem;
    color: #fff;
`;
export const ImageNext = styled(Image)`
    width: 30px;
    height: 30px;

    @media only screen and (min-width: 800px) {
        width: 40px;
        height: 40px;
    }
`;
