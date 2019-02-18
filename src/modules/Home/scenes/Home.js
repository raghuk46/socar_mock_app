import React, { PureComponent } from 'react';
import { Container, Content } from 'native-base';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import * as actions from '../redux/actions';

class Home extends PureComponent {

    componentWillMount() {
        // let first fetch all the car models and save in local store
        const { AppStore: { carModels }, saveCarModelsData } = this.props;
        if (isEmpty(carModels)) {
            firebase.database().ref('models/').once('value', snapshot => {
                if (snapshot) {
                    // let`s save the data to the store
                    const data = snapshot.val();
                    saveCarModelsData({ data });
                }
            }).catch(error => console.log(error));
        }

    }

    render(){
        return(
            <Container>
                <Content>
                    <View>
                        <Text>
                            Home Screen
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    AppStore: state.AppStore
});

export default connect(mapStateToProps, actions)(Home);