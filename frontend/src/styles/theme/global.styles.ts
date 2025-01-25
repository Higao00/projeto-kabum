import styled, { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    @font-face {
        font-family: 'bold';
        src: url("/assets/fonts/bold.ttf") format('truetype');
        font-display: swap
    }

    @font-face {
        font-family: 'light';
        src: url("/assets/fonts/light.ttf") format('truetype');
        font-display: swap
    }

    @font-face {
        font-family: 'medium';
        src: url("/assets/fonts/medium.ttf") format('truetype');
        font-display: swap
    }

    @font-face {
        font-family: 'regular';
        src: url("/assets/fonts/regular.ttf") format('truetype');
        font-display: swap
    }
    
    
    html, body{
        padding: 0;
        margin: 0;
        scroll-behavior: smooth;

        ::-webkit-scrollbar {
            display: none;
        }
        
    }

    body {
        transition: 0.1s;
        background: ${(props) => props.theme.background_global};
        color:${(props) => props.theme.background_global};
        
        
        .p-dialog-header, .p-dialog-content, .p-editor-toolbar, .ql-editor, .p-inputtextarea{
            background: ${(props) => props.theme.background_global} !important;
            color:${(props) => props.theme.color.secondary} !important;
        }
        
        .p-datatable, .p-dialog-content, .ql-editor, .p-inputtextarea{
            ::-webkit-scrollbar {
                width: 0;
                background-color: transparent;
            }
        }
        
        td,
        tr,
        th {
            text-align: center;
        }

        .p-column-header-content {
            justify-content: center;
        }

        th {
            background: rgba(238, 238, 238, 0.3) !important;
            color: ${(props) => props.theme.color.table} !important;
        }

        tr {
            background: ${(props) => props.theme.background.table} !important;
            color: ${(props) => props.theme.color.table} !important;
        }
        
        .p-dropdown-panel{
            max-width: 100vw !important;
        }
    }

    img{
        max-width: 100% !important;
    }

    a{
        text-decoration: none;
    }
    
    h1{
        font-size: clamp(1rem, 2vw, 1.5rem);
        font-family: ${(props) => props.theme.fonts.bold} !important;
    }
    
    h2{
        font-size: clamp(1rem, 2vw, 1.4rem);
        font-family: ${(props) => props.theme.fonts.medium} !important;
    }
    
    h3{
        font-size: clamp(1rem, 2vw, 1.3rem);
        font-family: ${(props) => props.theme.fonts.medium} !important;
    }
    
    h4{
        font-size: clamp(1rem, 2vw, 1.2rem);
        font-family: ${(props) => props.theme.fonts.medium} !important;
    }
    
    h5{
        font-size: clamp(1rem, 2vw, 1.1rem);
        font-family: ${(props) => props.theme.fonts.medium} !important;
    }
    
    p, span, li, div, input, small, textarea, button{
        font-size: clamp(0.8rem, 2vw, 1rem);
        font-family: ${(props) => props.theme.fonts.regular} !important;
    }
    
    strong{
        font-size: clamp(0.8rem, 2vw, 1rem);
        font-family: ${(props) => props.theme.fonts.bold} !important;
    }

    button {
        font-size: clamp(0.8rem, 2vw, 1rem);
        font-family: ${({ theme }) => theme.fonts.medium} !important;
    }
    
    .p-toast{
        z-index: 99999999 !important;
        
        @media (max-width: 600px) {
            right: 10px;
        }
    }
`

export const TitlePages = styled.h1`
    color: ${({ theme }) => theme.color.secondary};

    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: clamp(1.4rem, 2vw, 2rem);
    text-align: center;
    text-transform: uppercase;

    margin: 1rem 0;

    @media (min-width: 800px) {
        text-align: left;
    }
`
