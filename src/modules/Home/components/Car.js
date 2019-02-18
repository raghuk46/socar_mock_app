import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { get } from 'lodash';

const CarWrapper = styled.View`
    flex: 1;
    margin-horizontal: 8px;
    margin-vertical: 16px;
    background-color: ${props => props.selected ? "#00AFE8" : "#FFFFFF"};
    width: 165px;
    height: 100px;
    border-radius: 15;
    border-width: 1;
    border-color: #CCCCCC;
    elevation: 5;
    box-shadow: 5px 5px 5px #b6b6b6;
`;

const CarImageWrapper = styled.View`
    flex: 1;
    position: absolute;
    top: -50px;
    left: 25px;
`;

const CarImage = styled.Image`
    width: 100px;
    height: 100px;
`;

const CarTitleWrapper = styled.View`
    flex: 1;
    margin-top: 24px;
    justify-content: center;
    align-items: center;
`;

const CarTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: ${props => props.selected ? "#FFFFFF" : "#242424"};
`;

const CarPriceWrapper = styled.View`
    flex-direction: row;
    margin-vertical: 8px;
    justify-content: center;
    align-items: center;
`;

const CarRentalPrice = styled.Text`
    font-size: 24px;
    color: ${props => props.selected ? "#FFFFFF" : "#242424"};
    font-weight: bold;
`;

const CarRentalPpfix = styled(CarRentalPrice)`
    margin-horizontal: 4px;
    font-size: 14px; 
    top: 4px;
    color: #242424;
    font-weight: normal;
`;


export default( props => {
    const { selected, carName, image,  rates, dateParam } = props;
    const price = get(rates, `${dateParam}`, 0);
    return <CarWrapper selected={selected}>
        <CarImageWrapper>
            <CarImage source={{ uri: image }} resizeMode="cover" />
        </CarImageWrapper>
        <CarTitleWrapper>
            <CarTitle selected={selected}>{carName}</CarTitle>
        </CarTitleWrapper>
        <CarPriceWrapper>
            <CarRentalPpfix selected={selected}>RM</CarRentalPpfix>
            <CarRentalPrice selected={selected}>{price}</CarRentalPrice>
            <CarRentalPpfix selected={selected}>/hr</CarRentalPpfix>
        </CarPriceWrapper>
    </CarWrapper>
});