import React from 'react';
import styled from 'styled-components/native';

const ImageWrapper = styled.Image``;

export default( props => {
    return <ImageWrapper  resizeMode="cover" source={props.src} />
});