import React ,{useRef,useEffect}from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomNuber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomNuber(min, max, exclude);
  } else {
    return rndNum;
  }
};


export default function GameScreen(props) {
  const [currentGuss, setCurrentGuess] = useState(
    generateRandomNuber(1, 100, props.userChoice)
  );
  const [round,setround]=useState(0);
  useEffect(()=>{
    if(currentGuss==props.userChoice){
        props.gameOver(round)
    }
})
  const currentLow=useRef(1);
  const currentHigh=useRef(100);
  const nextGuessHandler=(direction)=>{
    if((direction==='lower' && currentGuss<props.userChoice) || (direction==='greater' && currentGuss>props.userChoice)){
        Alert.alert('Bohot tez ho rahe ho!','Tujhe malum hai!',[{text:'Maaf karo',style:'cancel'}]);
        return;
    }
    if(direction==='lower'){
        currentHigh.current=currentGuss;
    }else{
        currentLow.current=currentGuss;
    }
   const nextnumber= generateRandomNuber(currentLow.current,currentHigh.current,currentGuss);
   setCurrentGuess(nextnumber);
   setround(cur=>cur+1);
  }
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuss}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={()=>nextGuessHandler('lower')} />
        <Button title="GREATER" onPress={()=>nextGuessHandler('greater')} />
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
