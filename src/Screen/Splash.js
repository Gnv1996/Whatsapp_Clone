import React,{useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Splash=()=>{
    const navigation=useNavigation();

    useEffect(()=>{
        setTimeout(()=>{
            checkLogin()
            

        },2000)

    },[])

    const checkLogin=async()=>{
        const id =await AsyncStorage.getItem('USERID');
        if(id!==null){
            navigation.navigate('Home')
        }else{
            navigation.navigate('Login')
        }
    }

    return(
<View style={styles.container}>
    <Text style={styles.logo}>Welcome Etech Chat Created by Gautam</Text>
</View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center'

    },
    logo:{
        fontSize:30,
        color:'white',
        fontWeight:'bold',
        padding:10,
        margin:40


    }
})
export default Splash;