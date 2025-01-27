import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { SplitButton } from 'primereact/splitbutton';
import { BsFillPersonFill } from "react-icons/bs"

import styled from "styled-components"

interface T_Status {
    $status?: boolean
}

export const Table = styled(DataTable)`
    width: 100%;
`
export const TableColumn = styled(Column)`
    max-width: 35ch;
    white-space: nowrap;
`
export const Status = styled.div<T_Status>`
    border-radius: 10px;

    text-align: center;

    padding: 0.3rem;

    margin-bottom: 5px;

    background: ${({ $status }) => ($status ? "green" : "red")};
    color: #fff;
`
export const ContainerButtonTable = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    align-items: center;

    button {
        margin: 0.2rem;
    }

    @media (min-width: 1920px) and (max-width: 2500px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 2500px) {
        grid-template-columns: repeat(4, 1fr);
    }
`
export const ContainerIcons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 60px;
    height: 60px;

    background-color: #fff;

    border-radius: 100%;
`
export const ContainerImage = styled.div`
    width: 60px;
    height: 60px;

    border-radius: 100%;

    img {
        border-radius: 100%;
    }
`
export const IconBsFillPersonFill = styled(BsFillPersonFill)`
    font-size: 3rem;
    color: #000;

    border-radius: 100%;
`
export const SplitButtonExtends = styled(SplitButton)`
    button {
        margin: 0;
    }
`
