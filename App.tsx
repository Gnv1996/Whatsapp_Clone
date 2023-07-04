import React from "react";
import {View,StatusBar, StyleSheet} from 'react-native';
import SignupScreen from "./src/SignupScreen";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./src/LoginScreen";



const theme={
  ...DefaultTheme,
  roundness:2,
  colors:{
    ...DefaultTheme.colors,
    primary:'green',
    
  }
}

const Stacks = createNativeStackNavigator();

const Navigation=()=>{
  return(
    <NavigationContainer>
      <Stacks.Navigator>
      <Stacks.Screen name='Login' component={LoginScreen}/>
      <Stacks.Screen name='signup' component={SignupScreen} />

      </Stacks.Navigator>
    </NavigationContainer>
  )
}



function App():JSX.Element{
  return(
    <>
    <PaperProvider theme={theme}>
     <StatusBar  animated={true} backgroundColor="#008000" barStyle='dark-content'/>
    <View style={styles.container}>
      <Navigation/>
    </View>
    </PaperProvider>
    </>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',


  }
})
export default App;