import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

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
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  room: {
    borderBottomWidth: 1,
    borderBottomColor: grey,
    marginBottom: 20
  },
  roomTop: {
    flex: 2,
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
    height: 200
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
  }
});

class HomeScreen extends React.Component {
  state = {
    tab: "list",
    rooms: null
  };
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Accueil"
    };
  };

  getRooms = async () => {
    let url = `https://airbnb-api.now.sh/api/room?city=paris`;
    try {
      const response = await axios.get(url);
      // console.log(response.data.rooms);

      this.setState({
        rooms: response.data.rooms
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    this.getRooms();
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

  _renderTabs() {
    return (
      <View style={{ flexDirection: "row" }}>
        <Button
          title="List"
          onPress={() => {
            this.setState({
              tab: "list"
            });
          }}
        />
        <Button
          title="Map"
          onPress={() => {
            this.setState({
              tab: "map"
            });
          }}
        />
      </View>
    );
  }

  _renderMap() {
    return (
      <MapView style={{ width: "100%", height: 240 }}>
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

  _renderRooms() {
    const { rooms } = this.state;
    return (
      <View style={styles.page}>
        <ScrollView>
          <FlatList
            keyExtractor={room => {
              return room._id;
            }}
            data={rooms}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Room", { id: item._id })
                }
              >
                <View style={styles.room}>
                  <View style={styles.roomTop}>
                    <Image
                      style={styles.roomPicture}
                      resizeMode="cover"
                      source={{
                        uri: item.photos[0]
                      }}
                    />
                    <Text style={styles.roomPrice}>{item.price} &euro;</Text>
                  </View>
                  <View style={styles.roomBot}>
                    <View style={styles.roomInfos}>
                      <Text style={styles.roomTitle}>{item.title}</Text>
                      <Text style={styles.roomRating}>
                        {this._renderRating(item.ratingValue)}
                        <Text style={styles.roomReviews}>
                          &nbsp;&nbsp;{item.reviews} reviews
                        </Text>
                      </Text>
                    </View>
                    <Image
                      style={styles.roomAvatar}
                      resizeMode="cover"
                      source={{
                        uri: item.user.account.photos[0]
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    );
  }

  render() {
    console.log(this.state);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {this.state.tab === "list" ? this._renderRooms() : this._renderMap()}
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
