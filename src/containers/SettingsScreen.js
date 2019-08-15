import React from "react";
import { Button, StyleSheet, AsyncStorage, View } from "react-native";

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Paramètres"
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Se déconnecter" onPress={this.signOutAsync} />
      </View>
    );
  }

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SettingsScreen;
