import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./Screen/Splash";
import SignupScreen from "./Screen/SignupScreen";
import LoginScreen from "./Screen/LoginScreen";
import HomeScreen from "./Screen/HomeScreen";
import Chat from './Screen/Chat';

const Stack=createNativeStackNavigator()
const AppNavigator=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Splash'} component={Splash} options={{headerShown:false}}/>
                <Stack.Screen name={'Signup'} component={SignupScreen}/>
                <Stack.Screen name={'Login'} component={LoginScreen}/>
                <Stack.Screen name={'Home'} component={HomeScreen} options={{headerShown:false}}/>
                <Stack.Screen name={'Chat'} component={Chat} options={({ route }) => ({
            title: `${route.params.data.name} `,
            headerShown: true,
          })}/>

            </Stack.Navigator>

        </NavigationContainer>

    )
}
export default AppNavigator;