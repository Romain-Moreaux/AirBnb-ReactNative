import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from "react-native";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import RoomSwiper from "./RoomSwiper";
import axios from "axios";
import styled from "@emotion/native";

const orange = "#f77754";
const black = "#2b2726";
const grey = "#738598";
const white = "#f2f2f2";

var styles = StyleSheet.create({
  header: {
    backgroundColor: orange
  },
  headerTitle: {
    color: white
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 4
  },
  room: {
    flex: 2,
    marginBottom: 20
  },
  roomTop: {
    flex: 2,
    borderWidth: 2,
    borderWidth: 1,
    borderColor: grey
  },
  roomBot: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16
  },
  roomInfos: {
    marginRight: 8,
    flex: 1
  },
  roomReviews: {
    color: grey,
    fontSize: 16
  },
  roomPicture: {
    width: "100%",
    flex: 1
  },
  roomPrice: {
    position: "absolute",
    bottom: 20,
    left: 0,
    backgroundColor: "#1a1a1a",
    color: white,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 20,
    fontWeight: "700"
  },
  roomTitle: {
    color: black,
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 8
  },
  roomAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: grey
  },
  roomDesc: {
    fontSize: 18,
    color: black
  },
  roomMap: {
    flex: 1
  }
});

class HomeScreen extends React.Component {
  state = {
    id: "",
    line: 3,
    room: null,
    tab: "",
    latitude: 0,
    longitude: 0
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Room",
      tabBarLabel: "Room",
      headerStyle: {
        backgroundColor: orange
      },
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 22
      }
    };
  };

  getRoom = async param => {
    let url = `https://airbnb-api.now.sh/api/room/${param}`;
    try {
      const response = await axios.get(url);
      console.log("response");
      console.log(response.data);

      this.setState({
        room: response.data
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  userLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        latitude: Number(location.coords.latitude),
        longitude: Number(location.coords.longitude)
      });
    }
  };

  componentDidMount() {
    this.setState(
      { tab: "list", id: this.props.navigation.state.params.id },
      () => {
        this.userLocation();
        this.getRoom(this.state.id);
      }
    );
  }

  _renderRating(rate) {
    let rating = [];
    for (let index = 0; index < 5; index++) {
      if (index < rate) {
        rating.push(
          <Ionicons key={index} name="md-star" size={18} color="gold" />
        );
      } else {
        rating.push(
          <Ionicons key={index} name="md-star" size={18} color={grey} />
        );
      }
    }

    return rating;
  }

  // _renderEmotion() {
  //   console.log("styled");
  //   console.log(styled);
  //   return (
  //     <Container
  //       style={css`
  //         border-radius: 10px;
  //       `}
  //     >
  //       <Description style={{ fontSize: 45, fontWeight: "bold" }}>
  //         Emotion Primitives
  //       </Description>
  //       />
  //     </Container>
  //   );
  // }
  _renderRoom() {
    const { room } = this.state;
    console.log(room);

    if (room) {
      return (
        <View style={styles.room}>
          <RoomSwiper room={room} style={styles.roomTop} showsButtons={true} />

          <View style={styles.roomBot}>
            <View style={styles.roomInfos}>
              <Text style={styles.roomTitle}>{room.title}</Text>
              <Text style={styles.roomRating}>
                {this._renderRating(room.ratingValue)}
                <Text style={styles.roomReviews}>
                  &nbsp;&nbsp;{room.reviews} reviews
                </Text>
              </Text>
            </View>
            <Image
              style={styles.roomAvatar}
              resizeMode="cover"
              source={{
                uri: room.user.account.photos[0]
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  line: this.state.line === 3 ? -1 : 3
                });
              }}
            >
              <Text numberOfLines={this.state.line} style={styles.roomDesc}>
                {room.description}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  _renderMap() {
    return (
      <MapView style={styles.roomMap}>
        <MapView.Marker
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          title={"Le Reacteur"}
          description={"La formation des champion·ne·s !"}
        />
      </MapView>
    );
  }

  render() {
    console.log(this.state);

    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.page}>
            {this._renderRoom()}
            {this._renderMap()}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default HomeScreen;
