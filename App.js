/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import MqttService from "./src/core/services/MqttService";
import OfflineNotification from "./src/core/components/OfflineNotification";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    isConnected: false,
    message: ""
  };

  componentDidMount() {
    MqttService.connectClient(
      this.mqttSuccessHandler,
      this.mqttConnectionLostHandler
    );
  }

  onWORLD = message => {
    this.setState({
      message
    });
  };

  mqttSuccessHandler = () => {
    console.info("connected to mqtt");
    MqttService.subscribe("WORLD", this.onWORLD);

    this.setState({
      isConnected: true
    });
  };

  mqttConnectionLostHandler = () => {
    this.setState({
      isConnected: false
    });
  };
  onPublish = () => {
    MqttService.publishMessage("TestPublish", "Hello from the app");
  }
  render() {
    const { isConnected, message } = this.state;
    return (
      <View style={styles.container}>
        {!isConnected && <OfflineNotification />}
        <Text style={styles.welcome}>You received message: {message}</Text>
        <Button
          onPress={this.onPublish}
          title="Publish"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
