import React, { PureComponent } from 'react';
import { Form } from 'native-base';
import { View, Text, StatusBar, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { Wrapper, FormContainer, AuthButtonWrapper, SeperatorView } from '../../../styles';
import Banner from '../components/Banner';
import Input from '../components/Input';
import TextLink  from '../components/TextLink';
import { Button } from '../../Common';
import * as actions from '../redux/actions';

class Login extends PureComponent {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        }
    }

    handleSubmit = async () => {
        const { email, password } = this.state;
        const { authenticateUser, saveUserDetails } = this.props;
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            if(user) {
                authenticateUser({ isAutorizedUser: true });
                const uid = get(user, 'user._user.uid', null);
                if(uid) {
                    // lets fetch the user details
                    const data = await firebase.database().ref(`users/${uid}`).once('value');
                    const userData = data.val();
                    // let`s save a footprint in local redux
                    saveUserDetails({ userData });
                    return this.props.navigation.navigate('Home');
                }
            }
        } catch(error) {
            console.log(error);
        }
    }

    render() {

        const { email, password } = this.state;
        return(
            <Wrapper>
                <StatusBar translucent backgroundColor="#00AFE8" color="#00AFE8" barStyle="dark-content" />
                <Banner backgroundColor="#00AFE8" imageSrc={require('../../../assets/images/Icon.png')} title="Sign Up" />
                <View style={{ flex: 1 }}>
                    <FormContainer>
                        <Input 
                            label="Email" 
                            defaultValue={email}
                            onChangeText={email => this.setState({ email })}
                            iconName="mail"
                            iconFamily="AntDesign"
                        />
                        <Input 
                            label="Password" 
                            defaultValue={password}
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry={true}
                            iconName="textbox-password"
                            iconFamily="MaterialCommunityIcons"
                        />
                        <SeperatorView marginTop={10} marginBottom={16} />
                        <AuthButtonWrapper>
                        <Button
                            {...this.props}
                            title="Sign In"
                            backgroundColor="#00AFE8"
                            textColor="#fff"
                            bordered={false}
                            handlePress={() => this.handleSubmit()}
                            full={true}
                            rounded={true}
                        />
                    </AuthButtonWrapper>
                    </FormContainer>
                </View>
                <TextLink {...this.props} navigateTo="SignUp" tagLine="Don`t have an account?" linkTitle="Create Now" />
            </Wrapper>
        );
    }
}

export default connect(null, actions)(Login);