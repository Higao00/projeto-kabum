import styled from "styled-components"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { BsFillCloudDownloadFill, BsPlusLg } from "react-icons/bs"

import { BsSearch } from "react-icons/bs"

export const Title = styled.h1`
    color: ${({ theme }) => theme.color.secondary};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: 25px;
`

export const Filters = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    flex-direction: column-reverse;

    @media (min-width: 800px) {
        display: grid;
        grid-template-columns: 60% 40%;
        justify-content: space-between;
    }
`

export const ContainerFilters = styled.div`
    width: 100%;
    gap: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
        flex-direction: row;
    }

    span,
    div {
        width: 100%;
    }
`

export const Card = styled.div`
    width: 100%;
    background-color: rgba(238, 238, 238, 0.3);
    padding: 1rem;
    border-radius: 10px;

    margin: 2rem 0 4rem 0;
`

export const BsSearchExtended = styled(BsSearch)`
    color: #000;
`

export const InputTextExtended = styled(InputText)`
    width: 100%;

    background-color: #fff !important;

    ::placeholder {
        font-family: ${({ theme }) => theme.fonts.light};
        color: #000;
    }

    :focus {
        box-shadow: 0 0 0 0.2rem rgba(81, 92, 102, 0.2) !important;
    }
    :hover {
        border-color: #515c66 !important;
    }
    
`
export const ButtonExtended = styled(Button)`
    width: 100%;
    margin-bottom: 0.5rem;

    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;

    @media (min-width: 800px) {
        width: fit-content;
        margin: 0 0.4rem;
    }
`

export const ContentButtonsTop = styled.div`
    display: flex;
    justify-self: end;

    .class-table-card-button {
        display: none;

        @media (min-width: 1000px) {
            display: block;
        }
    }
`

export const ContentDialog = styled.div`
    padding: 1rem;
    width: 100%;

    #inputTextFormName {
        width: 100%;
        margin-bottom: 1rem;

        :focus {
            box-shadow: 0 0 0 0.2rem rgba(81, 92, 102, 0.2) !important;
        }
        :hover {
            border-color: #515c66 !important;
        }
    }
`

export const SwitchContent = styled.div`
    display: flex;
    justify-content: center;
`

export const SubTitleDialog = styled.div`
    font-weight: 700;
    font-size: 1.25rem;
    color: #343a40;
    margin: 1rem 0;
`

export const BsPlusLgExtended = styled(BsPlusLg)`
    margin-right: 0.5rem;
    font-size: 1.3rem;
    color: #fff;
`

export const BsFillCloudDownloadFillExtended = styled(BsFillCloudDownloadFill)`
    margin-right: 0.5rem;
    font-size: 1.3rem;
    color: #fff;
`
export const IconOrderBy = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-left: 1rem;
    }
`
