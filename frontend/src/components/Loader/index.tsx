import * as S from "./styles"

const Loader = ({ width, height }: S.T_Loader) => {
    return (
        <S.Container width={width} height={height}>
            <S.Loader />
        </S.Container>
    )
}

export default Loader
