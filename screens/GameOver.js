import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import NumberContainer from '../components/NumberContainer';

export default function GameOver(props) {
  return (
    <View style={styles.screen}>
      <Text>Game Over!</Text>
      <Text>{props.no}</Text>
      <Text>You got in Rounds...</Text>
      <NumberContainer>{props.round}</NumberContainer>
      <Button onPress={props.startNewGame} title="NEW GAME" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
