import React, { PureComponent } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Button from '../../Common/components/Button'; 

const CardWrapper = styled.View`
    padding: 10px;
    background-color: #FFF;
    margin-horizontal: 10px;
    box-shadow: 0px 2px 2px #b6b6b6;
    shadow-opacity: 0.3;
    height: ${props => props.CARD_HEIGHT};
    width: ${props => props.CARD_WIDTH};
    overflow: hidden;
    border-radius: 5px;
    border-color: #b6b6b6;
`;

const CardContentWrapper = styled.View`
    flex: 1;
    margin: 8px;
`;

const CardTitle = styled.Text`
    font-size: 18px;
    font-weight: 600;
    color: #000;
`;

const CardAlias = styled(CardTitle)`
    font-size: 12px;
    font-weight: normal;
    color: #242424;
`;

const InfoWrapper = styled.View`
    flex-direction: row;
    margin-top: 16px;
`;

const Info = styled.View`
    margin-right: 16px;
`;

const InfoTitle = styled.Text`
    font-size: 14px;
    color: #b6b6b6;
    font-weight: normal;
`;

const InfoTitleValueWrapper = styled.View`
    margin-top: 8px;
`;

const InfoTitleValue = styled.Text`
    font-size: 20px;
    color: #242424;
    font-weight: normal;
`;

const InfoTitleCaption = styled(InfoTitleValue)`
    margin-left: 4px;
    font-size: 14px;
    color: #b6b6b6;
`;

class ListCard extends PureComponent {
    render(){
        const { CARD_WIDTH, CARD_HEIGHT, item: { name, alias, Cars, distance } } = this.props;
        const distanceKm = _.round(distance / 1000, 2);
        return(
            <CardWrapper CARD_WIDTH={CARD_WIDTH} CARD_HEIGHT={CARD_HEIGHT}>
                <CardContentWrapper>
                    <CardTitle numberOfLines={1}>{name}</CardTitle>
                    <CardAlias numberOfLines={1}>{alias}</CardAlias>
                    <InfoWrapper>
                        <Info>
                            <InfoTitle>Total Cars</InfoTitle>
                            <InfoTitleValueWrapper>
                                <InfoTitleValue>{_.size(Cars)}</InfoTitleValue>
                            </InfoTitleValueWrapper>
                        </Info>
                        <Info>
                            <InfoTitle>Availability</InfoTitle>
                            <InfoTitleValueWrapper>
                                <InfoTitleValue>24<InfoTitleCaption> Hrs</InfoTitleCaption></InfoTitleValue>
                            </InfoTitleValueWrapper>
                        </Info>
                        <Info>
                            <InfoTitle>Distance</InfoTitle>
                            <InfoTitleValueWrapper>
                                <InfoTitleValue>{`${distanceKm}`}<InfoTitleCaption> Km</InfoTitleCaption></InfoTitleValue>
                            </InfoTitleValueWrapper>
                        </Info>
                    </InfoWrapper>
                </CardContentWrapper>
            </CardWrapper>
        );
    }
}

export default ListCard;

