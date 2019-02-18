import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'native-base';
import _ from 'lodash';

const ButtonWrapper = styled(Button)`
    background-color: ${props => !props.bordered 
        ? props.isDisabled 
            ? '#ccc' 
            : props.backgroundColor : "#fff" 
    };
    border-color: ${props => props.backgroundColor}
    margin-horizontal: ${props => props.marginHorizontal ? props.marginHorizontal : '42px'};
    box-shadow: 0px 2px 2px #b6b6b6;
    shadow-opacity: 0.3;
`;

const TextWrapper = styled.Text`
    color: ${(props) => props.color ? props.color : '#000'};
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    background: transparent;
    font-family: FontAwesome;
`;

export default (props => {
    const { title, textColor, full, rounded, bordered, disabled, large, small, navigateTo, handlePress } = props;
    return <ButtonWrapper 
                {...props}
                full={full}
                large={large}
                small={small}
                rounded={rounded} 
                bordered={bordered}
                disabled={disabled}
                onPress={() => !_.isUndefined(navigateTo) ? props.navigation.navigate(navigateTo, { ...props.item }) : handlePress()}
            >
        <TextWrapper color={textColor} >{title}</TextWrapper>
    </ButtonWrapper>

});