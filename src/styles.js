import React from 'react';
import { Container, Content } from 'native-base';
import styled from 'styled-components/native';

export const Wrapper = styled(Container)`
    flex: 1;
    background-color: #FFFFFF;
`;

export const ContentWrapper = styled(Content)``;

export const DataWrapper = styled.View`
    flex: ${ props => props.flex ? props.flex : 1 };
    justify-content: center;
    align-items: center;
    margin-top: ${ props => props.top ? props.top : 8 };
`;

export const FormContainer = styled.View`
    position: absolute; 
    background-color: #fff;
    margin-horizontal: 16px;
    top: -80px;
    margin-top: 32px;
    border-radius: 15px;
    border-color: #CCCCCC;
    border-width: 1px;
`;

export const AuthButtonWrapper = styled.View`
    flex: 1;
    margin-top: 16px;
    position: absolute; 
    bottom: -20px;
    width: 100%;
`;

export const SeperatorView = styled.View`
    margin-top: ${ props => props.marginTop };
    margin-bottom: ${ props => props.marginBottom };
`;

export const HeadingTextWrapper = styled.View`
    margin: 16px;
`;

export const TimePickerWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    margin-horizontal: 16px;
`;

export const HeadingText = styled.Text`
    color: ${props => props.color ? props.color : '#242424'};
    font-size: ${props => props.size ? props.size : '18px'};
    font-weight: ${props => props.weight ? props.weight : 'normal'};
    text-align: center;
    margin-top: ${props => props.marginTop ? props.marginTop : '2px'};
`;

export const ModalImageWrapper = styled.View`
    flex: 1;
    position: absolute; 
    top: -90px; 
    align-items: center;
    justify-content: center;
    left: 80px;
    text-align: center;   
`;