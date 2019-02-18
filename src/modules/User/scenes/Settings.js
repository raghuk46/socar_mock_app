import React, { Component } from 'react';
import { Container, Content, Icon } from 'native-base';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import _ from 'lodash';
import firebase from 'react-native-firebase';

const RenderMenuItem = ({ name, icon, navigateTo, navigation, params }) => {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate(navigateTo, { ...params })}>
            <View style={styles.bottomBorder}>
                <View style={styles.manageListItem}>
                    <Image source={icon} style={{ width: 24, height: 24 }} />
                    <View style={{ marginLeft: 16 }}>
                        <Text style={styles.manageListItemText}>{name}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}


class Settings extends Component {

    handleLogout = async () => {
        try {
            const logout = await firebase.auth().signOut();
        } catch (error) {
            console.log(error);
        }
        
    }

    render() {
        const { navigation } = this.props;
        return(
            <Container style={styles.Container}>
                <Content>
                    <View style={styles.bottomBorder}>
                        <View style={{ marginLeft: 16, marginTop: 23, marginBottom: 17 }}>
                            <Text style={{ color: '#1E2328', fontSize: 16, fontWeight: '500'}}>Manage</Text>
                        </View>
                    </View>
                    <View style={styles.bottomBorder}>
                        <View style={styles.manageListItem}>
                            <Icon name="ios-heart" style={{ width: 28, height: 28}} />
                            <View style={{ marginLeft: 16 }}>
                                <Text style={styles.manageListItemText}>My Favourite</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomBorder}>
                        <View style={styles.manageListItem}>
                            <Icon name="receipt" type="FontAwesome5" style={{ width: 28, height: 28}} />
                            <View style={{ marginLeft: 16 }}>
                                <Text style={styles.manageListItemText}>Billing</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomBorder}>
                        <View style={styles.manageListItem}>
                            <Icon name="file" type="FontAwesome5" style={{ width: 28, height: 28}} />
                            <View style={{ marginLeft: 16 }}>
                                <Text style={styles.manageListItemText}>Terms Agreement</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomBorder}>
                        <View style={styles.manageListItem}>
                            <Icon name="folder-open" type="FontAwesome" style={{ width: 28, height: 28}} />
                            <View style={{ marginLeft: 16 }}>
                                <Text style={styles.manageListItemText}>Manage My Document</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomBorder}>
                        <View style={{ marginLeft: 16, marginTop: 35, marginBottom: 16 }}>
                            <Text style={{ color: '#1E2328', fontSize: 16, fontWeight: '500'}}>About & Support</Text>
                        </View>
                    </View>
                    <View style={styles.bottomBorder}>
                        <View style={{ marginLeft: 16, marginTop: 35, marginBottom: 16 }}>
                            <Text style={{ color: '#1E2328', fontSize: 16, fontWeight: '500'}}>Account</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.handleLogout(navigation)}>
                        <View style={styles.bottomBorder}>
                            <View style={styles.manageListItem}>
                                <Icon name="log-out" type="Entypo" style={{ width: 28, height: 28 }} />
                                <View style={{ marginLeft: 16 }}>
                                    <Text style={styles.manageLogoutText}>Log Out</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    userNameAvatar: {
        height: 113,
        marginLeft: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomBorder: {
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1
    },
    manageListItem: {
        marginLeft: 28,
        marginTop: 16,
        marginBottom: 17,
        flexDirection: 'row',
        alignItems: 'center'
    },
    manageListItemText: {
        color: '#000000',
        fontWeight: 'normal',
        fontSize: 14
    }
});

export default Settings;