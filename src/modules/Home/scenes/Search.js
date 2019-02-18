import React, { PureComponent } from 'react';
import { Dimensions, View, Text, Animated, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';

import Retro from '../../Common/MapStyles/Retro.json';
import * as api from '../services/api';
import ListCard from '../components/ListCard';
import { Button } from '../../Common';

let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 80;

class Search extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            locations: []
        }
    }

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
                this.fetchList();
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.4);
            if (index >= this.state.locations.length) {
                index = this.state.locations.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { lat, lng } = this.state.locations[index];
                    this.map.animateToRegion(
                        {
                            latitude: lat,
                            longitude: lng,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });

        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here



        // this.watchID = navigator.geolocation.watchPosition(
        //     position => {
        //         this.setState({
        //             region: {
        //                 latitude: position.coords.latitude,
        //                 longitude: position.coords.longitude,
        //                 latitudeDelta: LATITUDE_DELTA,
        //                 longitudeDelta: LONGITUDE_DELTA,
        //             }
        //         });
        //         this.fetchList();
        //     }
        // );
    }
    // componentWillUnmount() {
    //     navigator.geolocation.clearWatch(this.watchID);
    // }

    fetchList = async () => {
        const { latitude, longitude } = this.state.region;
        try {
            const list = await api.fetchLocations(latitude, longitude, 3000);
            if (list) {
                this.setState({ locations: list });
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { locations } = this.state;

        const interpolations = _.map(locations, (item, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });

        return (
            <View style={styles.container}>
                <MapView
                    ref={map => this.map = map}
                    region={this.state.region}
                    showsUserLocation
                    // onRegionChange={ region => this.setState({region}) }
                    // onRegionChangeComplete={ region => this.setState({region}) }
                    style={{ flex: 1, width, height }}
                >
                    {
                        locations && _.map(locations, (item, index) => {
                            const location = {};
                            location.latitude = item.lat;
                            location.longitude = item.lng;
                            const scaleStyle = {
                                transform: [
                                    {
                                        scale: interpolations[index].scale,
                                    },
                                ],
                            };
                            const opacityStyle = {
                                opacity: interpolations[index].opacity,
                            };
                            return (
                                <MapView.Marker key={index} coordinate={location}>
                                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                        <Animated.View style={[styles.ring, scaleStyle]} />
                                        <View style={styles.marker} />
                                    </Animated.View>
                                </MapView.Marker>
                            )
                        })
                    }
                </MapView>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >
                    {
                        _.map(locations, (item, index) => <View key={index}>
                                <ListCard {...this.props} item={item} CARD_HEIGHT={CARD_HEIGHT} CARD_WIDTH={CARD_WIDTH} />
                                <View style={{ marginTop: -25 }}>
                                    <Button
                                        {...this.props}
                                        item={item}
                                        title="Pick Location"
                                        backgroundColor="#00AFE8"
                                        textColor="#fff"
                                        bordered={false}
                                        navigateTo='Reservation'
                                        full={true}
                                        rounded={true}
                                    />
                                </View>
                            </View>
                        )
                    }
                </Animated.ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    markerWrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "rgba(0, 172, 230, 0.9)",
    },
    ring: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(0, 172, 230, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(0, 172, 230, 0.5)",
    },
});

export default Search;