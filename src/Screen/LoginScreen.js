import React,{useState} from 'react'
import { View, Text ,Image,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Alert} from 'react-native'
import { TextInput,Button } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loader from './Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';



function LoginScreen() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [visible,setVisible]=useState(false)
   


    const navigation=useNavigation();
   
    const LoginUser=()=>{
        setVisible(true);
        firestore().collection('users').where("email","==",email).get()
        .then(res=>{
            setVisible(false)
            if(res.docs !==[]){
            console.log(JSON.stringify(res.docs[0].data()))
            goToNext(
                res.docs[0].data().name,
                res.docs[0].data().email,
                res.docs[0].data().userId)
       }else{
        Alert.alert("User not Found")
       }
     }).catch(error=>{
        setVisible(false)
            console.log(error)
            Alert.alert("User not Found")
        })
    } 

    const goToNext=async(name,email,userId)=>{
        await AsyncStorage.setItem('NAME',name);
        await AsyncStorage.setItem('EMAIL',email);
        await AsyncStorage.setItem('USERID',userId);
        navigation.navigate('Home')


    }
    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Text style={styles.text}>Welcome to Etech Chat</Text>
                <Image style={styles.img} source={require('./assest/chat.png')} />
            </View>
            <View style={styles.box2}>
            
                 <TextInput
                 label="Email"
                 value={email}
                 onChangeText={(text)=>setEmail(text)}
                 mode="outlined"
                />
                <TextInput
                 label="password"
                 mode="outlined"
                 value={password}
                 onChangeText={(text)=>setPassword(text)}
                 secureTextEntry
                />
                 <Button
                mode="contained"
                style={{backgroundColor:'#2196f3'}} onPress={()=>LoginUser()}>Login</Button>
                <TouchableOpacity onPress={()=>navigation.navigate('Signup')}><Text style={{textAlign:"center",color:'black'}}>Dont have an account ?</Text></TouchableOpacity>
               <Loader  visible={visible}/>
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    text:{
        fontSize:25,
        color:'#2196f3',
        marginTop:10,
        marginBottom:25,
        fontWeight:'bold'
    },
    img:{
        width:200,
        height:200
    },
    box1:{
        alignItems:"center"
    },
    box2:{
        paddingHorizontal:40,
        justifyContent:"space-evenly",
        height:"50%"
    }
 });
 export default LoginScreen;