import { T_Skeleton } from "@/types/Global/T_Skeleton"
import * as S from "./styles"

export const Skeleton = ({ height }: T_Skeleton) => {
    return (
        <S.Container>
            <S.SkeletonExtend width="100%" height={height ? `${height}px` : "150px"} />

            <S.ContainerButtons>
                <S.SkeletonExtend width="5rem" height="2rem" />
                <S.SkeletonExtend width="5rem" height="2rem" />
                <S.SkeletonExtend width="5rem" height="2rem" />
                <S.SkeletonExtend width="5rem" height="2rem" />
            </S.ContainerButtons>
        </S.Container>
    )
}

export const SkeletonCallPage = () => {
    return (
        <>
            <S.ContainerHeader>
                <S.SkeletonExtend height="3rem" />

                <S.ContainerHeaderButtons>
                    <S.SkeletonExtend height="3rem" />
                    <S.SkeletonExtend height="3rem" />
                    <S.SkeletonExtend height="3rem" />
                </S.ContainerHeaderButtons>
            </S.ContainerHeader>

            <br />

            <S.SkeletonExtend width="100%" height="15rem" />

            <br />

            <S.SkeletonExtend width="100%" height="15rem" />

            <br />

            <S.SkeletonExtend width="100%" height="15rem" />
        </>
    )
}
