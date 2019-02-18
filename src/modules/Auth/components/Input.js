import React from 'react';
import { Dimensions } from 'react-native';
import { Input, Item, Label, Icon } from 'native-base';
import styled from 'styled-components/native';
import { isEmpty } from 'lodash';

const InputWrapper = styled.View`
    flex: 1;
    justify-content: center;
    width: ${Dimensions.get("screen").width - 66} 
    margin-horizontal: 16px;
    margin-top: 14px;
    margin-bottom: 24px;
`;


export default (({
    label,
    inputName,
    defaultValue,
    placeholder,
    keyboard,
    secureTextEntry,
    onChangeText,
    iconName,
    iconFamily,
    error,
    success,
}) => {
    return <InputWrapper>
        <Item floatingLabel error={error} success={success}>
            <Label>{label}</Label>
            <Input
                keyboardType={isEmpty(keyboard) ? keyboard : 'default'}
                defaultValue={defaultValue}
                onChangeText={inputName => onChangeText(inputName)}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
            />
            {

            }
            <Icon active name={iconName} type={iconFamily} />
        </Item>
    </InputWrapper>
});