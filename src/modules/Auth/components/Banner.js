import React, { PureComponent } from 'react';
import { Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const BannerWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    height: ${Dimensions.get("window").height / 2};
    background-color: ${props => props.backgroundColor};
    border-color: grey;
    border-bottom-width: 1px;
`;

const ImageWrapper = styled.View`
    width: 100;
    height: 100;
    border-radius: 20;
    background-color: #FFF;
    align-items: center;
    border-color: #e4e4e4;
    border-width: 1px;
`;

const TitleWrapper = styled.View`
    margin: 6px;
`;

const TitleContainer = styled.Text`
    font-size: 18px;
    color: #FFF;
    font-weight: bold;
`;

const Banner = ({title, imageSrc, backgroundColor }) => {
    return <BannerWrapper backgroundColor={backgroundColor}>
        <ImageWrapper>
            <Image source={imageSrc} resizeMode="cover" style={{ marginTop: 10 }} />
        </ImageWrapper>
        <TitleWrapper>
            <TitleContainer>{title}</TitleContainer>
        </TitleWrapper>
    </BannerWrapper>
};

export default Banner;