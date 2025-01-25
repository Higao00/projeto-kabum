import { BsArrowReturnRight, BsArrowUpRightSquareFill, BsChatLeftText, BsGear, BsGearFill, BsWrenchAdjustable } from "react-icons/bs"
import styled from "styled-components"

interface T_ContainerCard {
    background?: string
}

interface T_Description {
    fontSize?: number
}

interface T_Icons {
    color: string
}

export const Container = styled.section`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    justify-items: center;
    gap: 1rem;

    @media (min-width: 1280px) {
        grid-template-columns: repeat(3, 1fr);
    }
`
export const ContainerCard = styled.div<T_ContainerCard>`
    width: 100%;
    height: 250px;

    padding: 1rem;
    cursor: pointer;

    border-radius: 10px;
    background: ${({ background }) => (background ? background : "#FFF")};
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`
export const ContainerHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const ContainerFooter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > :not(:first-child) {
        margin-left: 1.5rem;
    }
`
export const ContainerBody = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const ContainerBodySection = styled.div`
    display: flex;
    align-items: center;

    > :not(:first-child) {
        margin-left: 1rem;
    }
`
export const BsApp = styled.div<T_Icons>`
    min-width: 70px;
    min-height: 70px;

    padding: 0.3rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 15px;
    border: solid 4px ${({ color }) => color};

    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`
export const Title = styled.h2`
    color: ${({ theme }) => theme.color.secondary};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: 24px;

    margin: 0;
`
export const Description = styled.p<T_Description>`
    color: ${({ theme }) => theme.color.secondary};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "22px")};

    margin: 0;
`
export const ContainerChart = styled.div`
    @media (min-width: 1280px) {
        width: 70%;
    }
`

// Icons
export const BsArrowUpRightSquareFillExtends = styled(BsArrowUpRightSquareFill)<T_Icons>`
    font-size: 2rem;
    transition: 0.3s;
    color: ${({ color }) => color};

    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

    :hover {
        transform: scale(1.2);
    }
`
export const BsArrowReturnRightExtends = styled(BsArrowReturnRight)<T_Icons>`
    font-size: 3rem;
    color: ${({ color }) => color};
`
export const BsGearExtends = styled(BsGear)`
    font-size: 3.2rem;
    color: #ffc559;
    margin-right: 1rem;
`
export const BsWrenchAdjustableExtends = styled(BsWrenchAdjustable)`
    font-size: 3.2rem;
    color: #82c083;
    margin-right: 1rem;
`
export const BsChatLeftTextExtends = styled(BsChatLeftText)`
    font-size: 3.2rem;
    color: #bd7bbd;
    margin-right: 1rem;
`
