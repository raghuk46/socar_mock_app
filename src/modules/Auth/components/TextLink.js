import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
    margin-bottom: 48px;
    justify-content: center;
    align-items: center;
`;

const TextWrapper = styled.Text`
    color: #b6b6b6;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
`;

const TextLink = props => {
    const { tagLine, linkTitle, navigateTo, navigation } = props;
    return <Wrapper>
        <TextWrapper>{tagLine}{' '}
            <TextWrapper 
                onPress={() => navigation.navigate(navigateTo) } 
                style={{ fontWeight: 'bold', color: '#000' }}
            >
                {linkTitle}
            </TextWrapper>
        </TextWrapper>
    </Wrapper>
};

export default TextLink;