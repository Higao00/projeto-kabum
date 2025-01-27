import styled from "styled-components"

interface T_ContainerSide {
    $menuSide: boolean
}

export const Container = styled.main<T_ContainerSide>`
    width: 100%;
    height: calc(100vh - 4rem);

    overflow: auto;

    position: fixed;

    background: ${({ theme }) => theme.background_global};

    padding: 1rem 1rem 6rem 1rem;

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

    @media only screen and (min-width: 800px) {
        width: ${({ $menuSide }) => ($menuSide ? "calc(100vw - 250px)" : "100%")};
        margin-left: ${({ $menuSide }) => ($menuSide ? "250px" : "0px")};

        padding: 2rem;

        margin-bottom: 2rem;

        transition: 0.4s;
    }
`
