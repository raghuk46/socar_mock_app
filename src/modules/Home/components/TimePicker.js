import React, { PureComponent } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styled from 'styled-components/native';
import moment from 'moment';
import { isUndefined, isNull  } from 'lodash';

const Wrapper = styled.View`
    flex: 1;
    background-color: #FFF;
    border-radius: 15;
    border-width: 1;
    border-color: #CCCCCC;
    elevation: 5;
    box-shadow: 2px 2px 2px #b6b6b6;
    margin-right: 6px;
`;

const ContentWrapper = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    margin: 8px;
`;

const TitleContainer = styled.View`
    padding: 8px;
`;

const TitleText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.color ? props.color : "#B6B6B6"};
`;

class TimePicker extends PureComponent {

    constructor(props) {
        super(props);

        this.state= {
            isVisible: false
        };
    }

    _handleDatePicked = (time) => {
        this.props.settime(time);
        console.log('A date has been picked: ', time);
        this._hideDateTimePicker();
    };

    _hideDateTimePicker = () => this.setState({ isVisible: false });

    render() {
        const { isVisible } = this.state;
        const { title, selectedTime } = this.props;
        const displayTime = !isNull(selectedTime) ? moment(selectedTime).format('LT') : null;
        return(
            <Wrapper >
                <ContentWrapper onPress={() => this.setState({ isVisible: true })}>
                    <TitleContainer>
                        <TitleText>{title}</TitleText>
                    </TitleContainer>
                    <TitleContainer>
                        <TitleText color="#242424">{displayTime}</TitleText>
                    </TitleContainer>
                </ContentWrapper>
                <DateTimePicker
                    isVisible={isVisible}
                    mode="time"
                    is24Hour
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
            </Wrapper>
        );
    }

}

export default TimePicker;