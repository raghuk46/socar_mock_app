import React, { PureComponent } from 'react';
import { Container, Content } from 'native-base';
import _ from 'lodash';

import { Wrapper, DataWrapper, SeperatorView } from '../../../styles';
import { Button } from '../../Common';
import ImageContainer from '../components/ImageContainer';

class Splash extends PureComponent {

    static navigationOptions = {
        header: null
    }

    render(){
        return(
            <Wrapper>
                <Content>
                    <DataWrapper flex={3} top={36}>
                        <ImageContainer src={require('../../../assets/images/logo.png')} />
                    </DataWrapper>
                    <DataWrapper flex={1} top={48}>
                        <Button
                            {...this.props}
                            title="Sign Up"
                            backgroundColor="#00AFE8"
                            textColor="#fff"
                            bordered={false}
                            navigateTo='SignUp'
                            full={true}
                            rounded={true}
                        />
                        <SeperatorView marginTop={8} marginBottom={8} />
                        <Button
                            {...this.props}
                            title="Sign In"
                            backgroundColor="#00AFE8"
                            textColor="#00AFE8"
                            bordered={true}
                            navigateTo='Login'
                            full={true}
                            rounded={true}
                        />
                    </DataWrapper>
                </Content>
            </Wrapper>
        );
    }
}

export default Splash;