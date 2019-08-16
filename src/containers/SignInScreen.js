import React from "react";
import {
  Button,
  AsyncStorage,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import styled, { css } from "@emotion/native";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;
const Description = styled.Text({
  color: "hotpink"
});
const MonText = styled.Text({
  color: "red"
});

const orange = "#f77754";
const black = "#2b2726";
const grey = "#738598";
const white = "#f2f2f2";

class SignInScreen extends React.Component {
  state = {
    email: "arno@airbnb-api.com",
    password: "password01",
    errorMessage: ""
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Bienvenue",
      header: null
    };
  };

  _renderEmotion() {
    console.log("styled");
    console.log(styled);
    return (
      <Container>
        <Description style={{ fontSize: 45, fontWeight: "bold" }}>
          Emotion Primitives<MonText>czdfdfdf</MonText>
        </Description>
      </Container>
    );
  }

  render() {
    console.log(this.state);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: orange }}>
        <StatusBar barStyle="light-content" />
        {/* {this._renderEmotion()} */}
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          <View
            style={{
              alignItems: "center",
              marginBottom: 30
            }}
          >
            <Ionicons name="md-home" size={100} color={white} />
            <Text style={{ color: white, fontSize: 30, fontWeight: "400" }}>
              Welcome
            </Text>
          </View>
          <TextInput
            style={{
              height: 44,
              borderBottomColor: white,
              borderBottomWidth: 1,
              color: white,
              fontSize: 16
            }}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={{
              height: 44,
              borderBottomColor: white,
              borderBottomWidth: 1,
              color: white,
              fontSize: 16
            }}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Text style={{ color: white, fontSize: 14, marginTop: 20 }}>
            {this.state.errorMessage}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: white,
              height: 60,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
            }}
            onPress={this.signInAsync}
          >
            <Text style={{ color: orange, fontSize: 20 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  signInAsync = async () => {
    try {
      let data = JSON.stringify({
        password: this.state.password,
        email: this.state.email
      });

      const response = await axios.post(
        "https://airbnb-api.now.sh/api/user/log_in",
        data,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response.data);
      if (response.data.token)
        await AsyncStorage.setItem("userToken", response.data.token);
      this.props.navigation.navigate("App");
    } catch (e) {
      this.setState({
        errorMessage: "Mauvais mot de passe/identifiant"
      });
    }
  };
}

export default SignInScreen;
