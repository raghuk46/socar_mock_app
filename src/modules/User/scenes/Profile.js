import React, { PureComponent } from 'react';
import { Container, Content } from 'native-base';
import { View, Text } from 'react-native';

class Profile extends PureComponent {
    render(){
        return(
            <Container>
                <Content>
                    <View>
                        <Text>
                            Profile Screen
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Profile;