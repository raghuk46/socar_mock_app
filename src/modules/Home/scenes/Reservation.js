import React, { PureComponent } from 'react';
import { ScrollView, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import firebase from 'react-native-firebase';
import Modal from "react-native-modal";


import { Wrapper, ContentWrapper, HeadingTextWrapper, HeadingText, TimePickerWrapper, SeperatorView, ModalImageWrapper } from '../../../styles';
import Car from '../components/Car';
import TimePicker from '../components/TimePicker';
import * as actions from '../redux/actions';

import { Button } from '../../Common';

const { width, height } = Dimensions.get('window');

class Reservation extends PureComponent {

    constructor(props) {
        super(props);

        const date = new Date();
        const day = date.getDay();

        this.state = {
            selected: null,
            fromTime: null,
            toTime: null,
            hours: 0,
            totalFare: 0,
            dateParam: (day === 6) || (day === 0) ? 'weekends' : 'weekdays',
            isModalVisible: false
        }
    }

    componentDidUpdate(prevPros, prevState) {
        if(prevState !== this.state) {
            let hours, totalFare = 0;
            const { fromTime, toTime, selected, dateParam } = this.state;
            if(!_.isNull(fromTime) && !_.isNull(toTime)) {
                const { AppStore: { carModels } } = this.props;
                const item = _.find(carModels, {id : selected});
                const duration = moment.duration(moment(toTime).diff(moment(fromTime)));
                hours = _.round(duration.asHours(), 2);
                const baseRate = _.get(item, `rates.${dateParam}`, 0);
                totalFare = _.round(baseRate * hours, 2);
            }
            this.setState({ hours, totalFare });
        }
        
    }

    handleReservation = async () => {
        
        const { Auth: { userData: { uid } }, AppStore: { carModels, reservations } } = this.props;
        const { fromTime, toTime, hours, totalFare, baseRate, selected } = this.state;
        try {
            if(_.isUndefined(_.find(reservations, {reservationStatus: 'active'}))) {
                const item = _.find(carModels, { id : selected });
                let reservationData = {
                    uid,
                    startTime: fromTime,
                    endTime: toTime,
                    duration: hours,
                    farePerHour: baseRate,
                    estimatedFare: totalFare,
                    reservationStatus: 'active',
                    carDetails: {
                        id: selected,
                        name: item.carName,
                        thumbnail: item.image,
                        segment: item.segment,
                        passengers: item.passengers,
                        make: item.comment
                    }
                };
                const reservationInfo = await firebase.database().ref('reservations/').push(reservationData);
                reservationData.key = reservationInfo.key;
                // lets save a record in local store
                this.props.storeUserReservation({ ...reservationData });
                this.setState({ isModalVisible: true });
            }
        } catch(error) {
            console.log(error);
        }
    }

    handleModal = () => {
        this.setState({ isModalVisible : false });
        this.props.navigation.navigate('Home');
    };

    render() {
        const { selected, fromTime, toTime, dateParam, totalFare, isModalVisible } = this.state;
        const { navigation, AppStore: { carModels, reservations } } = this.props;
        const { params: { name, alias, Cars }} = navigation.state;
        console.log(_.find(reservations, {reservationStatus: 'active'}));
        return(
            <Wrapper>
                <ContentWrapper>
                    <HeadingTextWrapper>
                        <HeadingText>Location Details</HeadingText>
                        <HeadingText marginTop={8} size={20} weight="bold">{name}</HeadingText>
                        <HeadingText size={14} color='#B6B6B6'>{alias}</HeadingText>
                    </HeadingTextWrapper>
                    <HeadingTextWrapper>
                        <HeadingText>Choose Your Car</HeadingText>
                    </HeadingTextWrapper>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            !_.isEmpty(Cars) && _.map(Cars, (item, index) => {
                                const CarDetails = _.find(carModels, {id : item.carClassId});
                                return (
                                    <TouchableOpacity key={index} onPress={() => this.setState({ selected: item.carClassId })}>
                                        <Car selected={(item.carClassId === selected) ? true : false } {...CarDetails} dateParam={dateParam}  />
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                    <HeadingTextWrapper>
                        <HeadingText>Choose Your Slot</HeadingText>
                    </HeadingTextWrapper>
                    <TimePickerWrapper>
                        <TimePicker title="FROM" selectedTime={fromTime} settime={fromTime => this.setState({ fromTime })} />
                        <TimePicker title="TO" selectedTime={toTime} settime={toTime => this.setState({ toTime })} />
                    </TimePickerWrapper>
                    <HeadingTextWrapper>
                        <HeadingText>Total Fare</HeadingText>
                        <HeadingText size={16}>RM <HeadingText marginTop={8} weight="bold" size={28}>{totalFare}</HeadingText></HeadingText>
                    </HeadingTextWrapper>
                    <Button
                        {...this.props}
                        title="Book"
                        backgroundColor="#00AFE8"
                        textColor="#fff"
                        bordered={false}
                        full={true}
                        rounded={true}
                        handlePress={() => this.handleReservation()}
                    />
                </ContentWrapper>
                <Modal 
                    isVisible={isModalVisible} 
                    useNativeDriver={true} 
                    hideModalContentWhileAnimating={true} 
                    onBackdropPress={() => this.setState({ isModalVisible: true })}
                >
                    <View style={{ backgroundColor: "#FFF" }}>
                        <ModalImageWrapper>
                            <Image 
                                    source={{ uri: _.get(reservations, `${_.size(reservations) - 1}.carDetails.thumbnail`, '')}} 
                                    // source={{ uri: "https://d3ah7cvs7m2c1a.cloudfront.net/Volkswagen_Passat/passat.png"}} 
                                    resizeMode="cover"
                                    style={{ width: 180, height: 180 }}
                                />
                        </ModalImageWrapper>
                        <View style={{ right: -5 }}><Icon name="md-close" onPress={() => this.setState({ isModalVisible: false })} /></View>
                        <SeperatorView marginTop={8} marginBottom={16} />
                        <HeadingTextWrapper>
                            <HeadingText size={24} color="#00AFE8" weight="bold" marginTop={8}>Let`s Drive SOCAR!</HeadingText>
                            <HeadingText size={16} color="#242424" marginTop={14}>Free For 15km</HeadingText>
                            <HeadingText size={14} color="#B6B6B6" marginTop={8} numberOfLines={2}>The fare will be paid automatically 10 minutes before the vehicle take place.</HeadingText>
                        </HeadingTextWrapper>
                        <Button
                            {...this.props}
                            title="Reservation Detail"
                            backgroundColor="#00AFE8"
                            textColor="#fff"
                            bordered={false}
                            full={true}
                            rounded={false}
                            marginHorizontal={1}
                            handlePress={() => this.handleModal()}
                        />
                    </View>
                </Modal>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({
    Auth: state.Auth,
    AppStore: state.AppStore
});

export default connect(mapStateToProps, actions)(Reservation);