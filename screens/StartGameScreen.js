import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

export default function StartGameScreen(props) {
  const [value, setvalue] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNu] = useState("");
  const nubmerInput = (no) => {
    setvalue(no.replace(/[^0-9]/g, ""));
  };

  const resetInputHandles = () => {
    setvalue("");
    setConfirm(false);
  };
  const confirmInputHandl = () => {
    const chosenNo = parseInt(value);
    if (isNaN(chosenNo) || chosenNo <= 0 || chosenNo > 99) {
      Alert.alert("Invalid Number", "Enter no between 1 to 99", [
        { text: "Okay", style: "destructive", onPress: resetInputHandles },
      ]);
      return;
    }
    setConfirm(true);
    setSelectedNu(chosenNo);
    setvalue("");
    Keyboard.dismiss()
  };

  let confirOutput;
  if (confirm) {
    confirOutput =<Card style={styles.summaryContainer}> 
      <Text>You Selected</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <Button title="START GAME" onPress={()=>props.onStartGame(selectedNumber)}/>
      </Card>
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start A New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            value={value}
            autoCorrect={false}
            keyboardType="number-pad"
            blurOnSubmit
            autoCapitalize="none"
            maxLength={2}
            style={styles.input}
            onChangeText={nubmerInput}
          />
          <View style={styles.buttonContainer}>
            <View style={{ width: 100 }}>
              <Button
                title="Reset"
                color="#c717fc"
                onPress={resetInputHandles}
              />
            </View>
            <View style={{ width: 100 }}>
              <Button
                title="Confirm"
                color="#f7287b"
                onPress={confirmInputHandl}
              />
            </View>
          </View>
        </Card>
        {confirOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer:{
    marginTop:20,
    alignItems:'center'
  }
});
