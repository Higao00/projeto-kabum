import { BsFillPersonFill } from "react-icons/bs"
import styled from "styled-components"
import { BsPeopleFill } from "react-icons/bs"
import { Tag } from "primereact/tag"
import { SplitButton } from "primereact/splitbutton"

interface T_FlagStatus {
    statusColor?: string
    padding?: string
}

interface T_Card {
    minHeight?: string
}

interface T_Status {
    $status?: boolean
}

export const Container = styled.div`
    width: 100%;
    height: auto;
`
export const Card = styled.div<T_Card>`
    width: 100%;
    height: 100%;
    min-height: ${({ minHeight }) => (minHeight ? minHeight : "250px")};

    background: rgb(79, 117, 180);
    background: linear-gradient(0deg, rgba(79, 117, 180, 1) 37%, rgba(75, 101, 145, 0.9430147058823529) 87%);

    border-radius: 10px;
    position: relative;

    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 3px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset;
`
export const TopCard = styled.div`
    width: 100%;
    height: fit-content;
    position: absolute;
    z-index: 99;
    top: -15px;
    padding: 0 1rem;

    display: flex;
    justify-content: space-between;
    column-gap: 1rem;
`
export const FlagName = styled.div`
    display: flex;
`
export const FlagStatus = styled.div<T_FlagStatus>`
    width: fit-content;
    min-width: 110px;
    height: 40px;

    background-color: ${({ statusColor }) => (statusColor ? statusColor : "#3b82f6")};
    border-radius: 10px;

    position: relative;
    padding: ${({ padding }) => (padding ? padding : "1rem")};

    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;

    @media only screen and (min-width: 800px) {
        height: 50px;
    }
`
export const FlagNumber = styled.div`
    width: fit-content;
    min-width: 80px;
    height: 40px;

    background-color: #3b82f6;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    border-radius: 10px;

    padding: 0.2rem 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (min-width: 800px) {
        height: 50px;
        min-width: 110px;
    }
`
export const ContainerImage = styled.div`
    width: 60px;
    height: 60px;

    border-radius: 100%;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -10px;

    img {
        border-radius: 100%;
    }
`

export const Title = styled.h2`
    font-size: clamp(0.8rem, 2vw, 1rem);
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.color.primary};
    font-weight: 300;
`
export const Description = styled.p`
    font-size: clamp(0.6rem, 2vw, 0.8rem);
    font-family: ${(props) => props.theme.fonts.light};
    color: ${(props) => props.theme.color.primary};
    font-weight: 100;
`

export const BodyCard = styled.ul`
    width: 100%;

    padding: 2.2rem 1rem 1rem 1rem;

    display: grid;
    grid-template-columns: 50% 50%;
`
export const LeftSideBodyCard = styled.li`
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    margin-top: 0.8rem;
    color: ${(props) => props.theme.color.primary};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    p {
        margin: 0;

        text-align: initial;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
export const RightSideBodyCard = styled.li`
    width: 100%;

    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    margin-top: 0.8rem;

    color: ${(props) => props.theme.color.primary};

    text-align: initial;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
export const BottomCard = styled.div`
    width: 100%;
    position: absolute;
    bottom: -25px;
    padding: 0 1rem;

    display: flex;
    justify-content: center;

    .groupButtons {
        width: 100%;
    }

    button {
        margin: 0.2rem;

        display: flex;
        justify-content: center;
        align-items: center;
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
export const Status = styled.div<T_Status>`
    border-radius: 10px;

    text-align: center;

    padding: 0.3rem;

    margin-bottom: 5px;

    background: ${({ $status }) => ($status ? "green" : "red")};
`

export const SplitButtonExtends = styled(SplitButton)`
    button {
        margin: 0;
    }
`

// start users
// --------------------------------------------------------------------

export const UsersBodyCard = styled.div`
    width: 100%;
    height: 100%;

    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
`
// start group
// --------------------------------------------------------------------

export const GroupContainer = styled.div`
    display: grid;
    grid-template-rows: 50% 50%;
    margin-left: 0.2rem;
`
export const GroupFlag = styled(FlagStatus)`
    width: 100%;
    height: auto;

    margin-bottom: 0.1rem;

    padding: 0.2rem 0.4rem;

    p {
        margin: 0;
    }
`

export const GroupContainerIcons = styled.div`
    background-color: #fff;

    border-radius: 100%;
    width: 18px;
    height: 18px;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.2rem;
`

// start permissions
// --------------------------------------------------------------------

export const PermissionTag = styled(Tag)`
    height: fit-content;
    padding: 0 1rem;
    margin: 0 1rem 0.2rem 1rem;
`

// start icons
// --------------------------------------------------------------------
export const IconBsFillPersonFill = styled(BsFillPersonFill)`
    font-size: 3rem;
    color: #000;

    border-radius: 100%;
`
export const BsPeopleFillExtended = styled(BsPeopleFill)`
    color: #000;
    font-size: 12px;
`
