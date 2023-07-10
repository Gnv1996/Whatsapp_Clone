import React from 'react';
import {StatusBar} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/AppNavigator.js';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#64b5f6',
    },
  };


function App(){
    return(
        <>
        <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="#64b5f6" />
    <AppNavigator/>
        </PaperProvider>
  
      </>

    )
}
export default App;




// function App():JSX.Element{
//   return(

//     <View>
//       <Text>Hello India</Text>
//       <SignupScreen/>
   
//     </View>
//   )
// }
// export default App;