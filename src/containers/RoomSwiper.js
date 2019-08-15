import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

const orange = "#f77754";
const black = "#2b2726";
const grey = "#738598";
const white = "#f2f2f2";

export default class RoomSwiper extends Component {
  render() {
    const photos = this.props.room.photos;
    const price = this.props.room.price;
    return (
      <Swiper
        showsButtons={true}
        showsPagination={false}
        prevButton={
          <Ionicons name="ios-arrow-dropleft-circle" size={32} color={orange} />
        }
        nextButton={
          <Ionicons
            name="ios-arrow-dropright-circle"
            size={32}
            color={orange}
          />
        }
      >
        {photos.map((photo, index) => {
          return (
            <View key={index} style={styles.slide}>
              <Image
                style={styles.picture}
                resizeMode="cover"
                source={{
                  uri: photo
                }}
              />
              <Text style={styles.text}>{price} &euro;</Text>
            </View>
          );
        })}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  picture: {
    width: "100%",
    flex: 1
  },
  text: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#1a1a1a",
    color: white,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 20,
    fontWeight: "700"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white,
    width: 32,
    height: 32,
    borderRadius: 16
  }
});
