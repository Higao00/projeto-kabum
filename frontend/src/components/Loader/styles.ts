import styled from "styled-components"

export interface T_Loader {
    width?: string
    height?: string
}

export const Container = styled.div<T_Loader>`
    width: 30px;
    height: 30px;

    margin-right: 0.5rem;

    span {
        width: 30px !important;
        height: 30px !important;
    }
`

export const Loader = styled.span`
    border: 5px solid #fff;
    border-bottom-color: ${({ theme }) => theme.background.first};
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`
