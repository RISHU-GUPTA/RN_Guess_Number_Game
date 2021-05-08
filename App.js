import React,{useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./components/Header";
import GameOver from "./screens/GameOver";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  const [userNumber,setUserno]=useState('')
  const [gameRounds,setGameRound]=useState(0);

  const gameOverHandle=(rounds)=>{
    setGameRound(rounds);
  }
  const startGameHandle=(no)=>{
    setUserno(no);
    setGameRound(0);
  }
  const newGame=()=>{
    setGameRound(0);
    setUserno(null);
  }
  let content;
if(userNumber && gameRounds==0){
 content= <GameScreen userChoice={userNumber} gameOver={gameOverHandle}/>
   
}else if(gameRounds>0){
  content=<GameOver round={gameRounds} no={userNumber} startNewGame={newGame}/>
}else{
  content=<StartGameScreen onStartGame={startGameHandle} />
}
  
  return (
    <View style={styles.screen}>
      <Header title="My App" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
