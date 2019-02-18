import React, { PureComponent } from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { get } from 'lodash';
import { connect } from 'react-redux';

import { Wrapper, FormContainer, AuthButtonWrapper, SeperatorView } from '../../../styles';
import Banner from '../components/Banner';
import Input from '../components/Input';
import TextLink  from '../components/TextLink';
import { Button } from '../../Common';
import * as actions from '../redux/actions';

class SignUp extends PureComponent {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
            loading: false,
            message: null
        }
    }

    
    handleSubmit = async () => { 
        const { name, email, password } = this.state;
        const { saveUserDetails, authenticateUser } = this.props;
        try{
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            if(user) {
                authenticateUser({ isAutorizedUser: true });
                // lets get the user uid and create a record in database
                const uid = get(user, 'user._user.uid', null);
                if(uid) {
                    // let proceed and save a record in firebase database
                    await firebase.database().ref(`users/${uid}`).set({ email, name, uid });
                    // lets fetch and see if the record is created
                    const data = await firebase.database().ref(`users/${uid}`).once('value');
                    const userData = data.val();
                    saveUserDetails({ userData })
                    // let`s save a footprint in local redux
                    return this.props.navigation.navigate('Home');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        const { name, email, password } = this.state;
        return(
            <Wrapper>
                <StatusBar translucent backgroundColor="#00AFE8" color="#00AFE8" barStyle="dark-content" />
                <Banner backgroundColor="#00AFE8" imageSrc={require('../../../assets/images/Icon.png')} title="Sign Up" />
                <View style={{ flex: 1 }}>
                    <FormContainer>
                        <Input 
                            label="Name" 
                            defaultValue={name}
                            onChangeText={name => this.setState({ name })}
                            iconName="user"
                            iconFamily="SimpleLineIcons"
                        />
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
                            title="Sign Up"
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
                <TextLink {...this.props} navigateTo="Login" tagLine="Already have an account?" linkTitle="Sign In" />
            </Wrapper>
        );
    }
}


export default connect(null, actions)(SignUp);