import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';

class AuthLoading extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount () {
       //  firebase.auth().signOut();
        this.authenticate = firebase.auth().onAuthStateChanged((user) => { 
            this.props.navigation.navigate(user ? 'App' : 'Auth'); 
        });
    }

    render() {
        return <ActivityIndicator />
    }
}

export default AuthLoading;