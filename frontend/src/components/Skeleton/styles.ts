import styled from "styled-components"

import { Skeleton } from "primereact/skeleton"

export const Container = styled.div`
    width: 100%;
    height: 220px;

    border-radius: 10px;
    border: solid 1px #dee2e64f;
`

export const SkeletonExtend = styled(Skeleton)``

export const ContainerButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    margin-top: 1rem;
`
export const ContainerHeader = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: end;

    div {
        width: 100% !important;
        margin-bottom: 1rem;
    }

    @media (min-width: 1280px) {
        flex-direction: row;
        justify-content: space-between;

        div {
            width: 35% !important;
        }
    }
`

export const ContainerHeaderButtons = styled.div`
    width: 50%;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    margin-right: 0.3rem;
`
