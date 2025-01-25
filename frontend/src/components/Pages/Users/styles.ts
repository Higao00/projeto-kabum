import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask"
import { BsFillPersonFill } from "react-icons/bs"
import styled from "styled-components"

export const Container = styled.section`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 5rem 2rem;

    @media (min-width: 800px) and (max-width: 1600px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1600px) and (max-width: 2200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 2200px) {
        grid-template-columns: repeat(4, 1fr);
    }
`
export const ContainerDialog = styled.div`
    width: 85vw;

    padding-top: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 800px) and (max-width: 1600px) {
        width: 60vw;
    }

    @media (min-width: 1600px) and (max-width: 2200px) {
        width: 35vw;
    }

    @media (min-width: 2200px) {
        width: 25vw;
    }
`
export const ContainerImageDeleteUser = styled.div`
    display: flex;
    align-items: center;

    img {
        border-radius: 100%;

        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
            rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
`
export const ContainerData = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-top: 1px solid #0000002b;
`
export const Title = styled.h3`
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: ${(props) => props.theme.color.ternary};
`
export const Description = styled.p`
    font-size: clamp(1rem, 2vw, 1.1rem);
    font-family: ${(props) => props.theme.fonts.light};
    color: ${(props) => props.theme.color.ternary};
`
export const ContainerButtons = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    span {
        margin-left: 0.5rem;
    }

    button {
        margin-left: 1rem;
    }
`
export const ContainerIconBsFillPersonFill = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 60px;
    height: 60px;

    background-color: #fff;

    border-radius: 100%;
`
export const IconBsFillPersonFill = styled(BsFillPersonFill)`
    font-size: 3rem;
    color: #000;

    border-radius: 100%;
`
export const InputTextLogin = styled(InputText)`
    width: 100%;
`
export const InputTextMask = styled(InputMask)`
    width: 100%;
`
export const ContainerUploadAndButtons = styled.div`
    width: 100%;
    height: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`
export const UploadImage = styled.div`
    width: 100%;
    min-height: 200px;

    border-radius: 10px;
    border: 0.5px dashed rgba(238, 238, 238, 3);

    .uploadFile {
        width: 100%;
        height: 220px;

        padding: 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        text-align: center;
        cursor: pointer;

        h4,
        p {
            margin: 0.7rem;
        }
    }

    .preview-image {
        width: 100%;
        height: 220px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        .container-image-preview {
            max-width: 200px;
            max-height: 200px;

            img {
                width: 100%;
                height: auto;

                border-radius: 100%;

                width: 130px;
                height: 130px;
            }
        }
    }
`
export const SwitchContent = styled.div`
    display: flex;
    justify-content: center;
`
