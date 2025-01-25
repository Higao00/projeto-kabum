import styled from "styled-components"
import { BsCameraFill, BsCheck2, BsXLg, BsFillPersonFill } from "react-icons/bs"
import { Button } from "primereact/button"
import { Tag } from "primereact/tag"
import { Chip } from "primereact/chip"
import { Dialog } from "primereact/dialog"

export const CardUserProfile = styled.div`
    width: 100%;
    min-height: 10rem;
    background: rgb(79, 117, 180);
    background: linear-gradient(
        0deg,
        rgba(79, 117, 180, 1) 37%,
        rgba(75, 101, 145, 0.9430147058823529) 87%
    );

    border-radius: 10px;
    margin-top: 3rem;
`

export const CardUserProfileExtended = styled(CardUserProfile)`
    min-height: 6rem;
    margin-top: 2rem;
`

export const ContentCard = styled.div`
    max-width: 100%;
    height: 100%;
    margin: 0 1rem;
    position: relative;

    padding: 1rem 0;

    display: flex;
    flex-direction: column-reverse;

    @media (min-width: 1281px) {
        flex-direction: column;
    }
`

export const ContainerTopCardUserProfile = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    justify-content: end;

    position: absolute;
    top: -1.5rem;
`

export const ButtonCardUserProfileTop = styled(Button)`
    padding: 0.8rem 1rem;

    span {
        font-family: ${(props) => props.theme.fonts.medium} !important;
        margin-left: 1.8rem;
    }
`

export const ButtonCardUserProfileTopSubmit = styled(Button)`
    padding: 0.8rem 2rem;

    span {
        font-family: ${(props) => props.theme.fonts.medium} !important;
        margin-left: 1.8rem;
    }
`

export const ButtonCardUserProfileTopCancel = styled(ButtonCardUserProfileTop)`
    margin-right: 1rem;
`

export const IconButtonTopProfile = styled.div`
    position: absolute;
    left: 0.4rem;
    margin-right: 0.5rem;
    width: 2.1rem;
    height: 2.1rem;
    background-color: white;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const BodyCardProfile = styled.div`
    width: 100%;
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1650px) {
        flex-direction: row;
        justify-content: space-between;
    }
`

export const AvatarUserProfile = styled.div`
    margin-top: 1rem;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1650px) {
        position: relative;

        width: auto;
        height: auto;

        margin-top: 0;
    }
`

export const CuttingAvatar = styled.div`
    width: 300px;
    height: 300px;

    position: relative;
    z-index: 99;

    img {
        border-radius: 100%;
    }
`

export const BottomContentAvatarProfile = styled.div`
    min-width: 50%;
    height: 3.8rem;

    border-radius: 10px;
    background-color: #3b82f6;

    padding: 0.5rem 0;
    margin-top: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    @media (min-width: 1650px) {
        width: 35rem;

        position: absolute;
        bottom: 0.5rem;
        right: -25rem;

        padding: 1rem 1rem 1rem 7rem;

        justify-content: right;

        gap: 1rem;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`

export const ButtonsBottomAvatarProfile = styled(Button)`
    margin: 0 0.5rem;

    span {
        font-family: ${(props) => props.theme.fonts.medium} !important;
        margin-left: 1.8rem;
    }
`

export const ContentLabelsBody = styled.div`
    margin: 2rem;
    width: 100%;

    @media (min-width: 1650px) {
        width: 55%;
        height: fit-content;
        margin: 0.5rem 0.8rem;

        display: grid;
        grid-template-columns: 50% 50%;

        @media (min-width: 1500px) {
            width: 66%;
        }

        @media (min-width: 1550px) {
            width: 70%;
        }

        @media (min-width: 1750px) {
            width: 75%;
        }
    }
`

export const ContentLabelsBodyLeft = styled.div`
    > :not(:first-child) {
        margin-top: 0.45rem;
    }

    @media (min-width: 1650px) {
        margin-right: 1rem;
    }
`

export const ContentLabelsBodyRight = styled.div`
    > :not(:first-child) {
        margin-top: 0.45rem;
    }

    @media (min-width: 1650px) {
        margin-left: 1rem;
    }
`

export const LabelInputText = styled.div`
    position: relative;
    p {
        margin: 0rem 0 0.3rem 0;
        font-family: ${(props) => props.theme.fonts.regular} !important;
    }
`

export const LabelInputTextGrid = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;

    p {
        margin: 0rem 0 0.3rem 0;
        font-family: ${(props) => props.theme.fonts.regular} !important;
    }

    > :nth-child(1) {
        margin-right: 1rem;
    }

    > :nth-child(2) {
        margin-left: 1rem;
    }

    button {
        width: 100%;
    }
`

export const TagExtended = styled(Tag)`
    width: 100%;
    padding: 0.5rem 3rem;
`

export const ChipExtended = styled(Chip)`
    width: 100%;
    background-color: #fff;
`

export const OverlayAvatarImage = styled.div`
    width: 300px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.3);

    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    top: 0;

    cursor: pointer;

    opacity: 0;
    animation: fadeIn 0.1s ease-in forwards;

    border-radius: 100%;
    overflow: hidden;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

export const BsCameraFillExtended = styled(BsCameraFill)`
    font-size: 3rem;
`

export const ContentDialog = styled.div`
    padding: 1rem 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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

export const DataTableControl = styled.div`
    max-height: 30rem;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background-color: #f8f9fa;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.background.ternary};
        border-radius: 10px;
    }
`

export const ContainerButtons = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    button {
        margin-left: 1rem;
    }
`

export const ViewImageProfile = styled(Dialog)`
    width: 50vw;

    @media (max-width: 800px) {
        width: 90%;
    }
`

export const EditImageProfile = styled(Dialog)`
    width: 50vw;

    @media (max-width: 800px) {
        width: 90%;
    }
`

export const LoaderExtended = styled.div`
    margin-right: 0.5rem;
`

export const BsCheck2xtended = styled(BsCheck2)`
    margin-right: 0.5rem;
    font-size: 1.2rem;
`

export const BsxLgExtended = styled(BsXLg)`
    margin-right: 0.5rem;
`

export const ContentImageProfileDialog = styled.div`
    position: relative;
    width: 300px;
    height: 300px;

    img {
        border-radius: 100%;
    }
`

export const ContainerViewImage = styled.div`
    margin-top: 1rem;

    display: flex;
    justify-content: start;
    align-items: start;
`

export const ContainerDropzone = styled.div`
    width: 100%;
    height: fit-content;

    text-align: center;
    background-color: rgba(245, 245, 245, 0.5);

    border-radius: 30px;

    margin-top: 0.5rem;
    border: 0.5px dashed rgba(0, 0, 0, 0.2);
`

export const ContentDialogPreviwImageDropZone = styled.div`
    padding: 1rem;

    img {
        border-radius: 100%;
    }
`

export const ContainerDialog = styled.div`
    width: 80vw;
    min-height: 40vh;

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

export const FooterButtonsUpdateAvatarProfile = styled.div`
    margin-top: 1rem;

    > :nth-child(1) {
        padding: 0.8rem 3rem;
        margin-right: 1rem;
    }

    > :nth-child(2) {
        padding: 0.8rem 3ch;
        margin-left: 1rem;
    }
`

export const ContainerIcons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 300px;
    height: 300px;

    background-color: #fff;
    border-radius: 100%;
    background-color: #fff;

    @media (min-width: 1650px) {
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        width: 100%;
        height: 100%;
    }
`

export const IconBsFillPersonFill = styled(BsFillPersonFill)`
    font-size: 10rem;
    color: #000;

    border-radius: 100%;
`

export const FooterContentButtonsDialogRemoveImage = styled.div`
    display: flex;
    justify-content: space-between;
`

export const ErrorMessageCreateGroup = styled.div`
    height: 1rem;
    font-size: 0.7rem;

    position: absolute;
    right: 0;
    top: 5px;
`
