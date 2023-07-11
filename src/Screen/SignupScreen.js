import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';



export default function SignupScreen() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showNext, setShowNext] = useState(false)

  const navigation = useNavigation()


  const registerUser = () => {
    const userId = uuid.v4();
    firestore().collection('users').doc(userId).set({
      name: name,
      email: email,
      phone: phone,
      password: password,
      userId: userId,

    }).then(res => {
      console.log('user created');
      navigation.navigate('Login')
    }).catch(error => {
      console.log(error)
    })


  }


  const validate = () => {
    if (name === '') {
      Alert.alert('Please enter your name');
      return false;
    }
    if (name.length > 20) {
      Alert.alert('Name should not exceed 20 characters');
      return false;
    }
    if (email === '') {
      Alert.alert('Please enter your email');
      return false;
    }
    if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email address');
      return false;
    }
    if (phone === '') {
      Alert.alert('Please enter your mobile number');
      return false;
    }
    if (!validateMobileNumber(phone)) {
      Alert.alert('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (password === '') {
      Alert.alert('Please enter your password');
      return false;
    }
    if (password.length < 8) {
      Alert.alert('Password should be at least 8 characters');
      return false;
    }

    return true;
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = number => {
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(number);
  };



  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box1}>
        <Text style={styles.text}>Welcome to Etech chat</Text>
        <Image style={styles.img} source={require('./assest/chat.png')} />
      </View>
      <View style={styles.box2}>
        {!showNext &&
          <>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="outlined"
            />
            <TextInput
              label="password"
              mode="outlined"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </>
        }

        {showNext ?
          <>
            <TextInput
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              mode="outlined"
            />
            <TextInput
              label="Phone"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              mode="outlined"
            />

            <Button
              mode="contained"
              disabled={phone ? false : true}
              style={{ backgroundColor: '#2196f3', color: 'white' }}
              onPress={() => {
                if (validate()) { registerUser() }
                else {
                  Alert.alert("Please Enter Correct Data")

                }
              }}>Signup</Button>
          </>
          :
          <Button
            mode="contained"
            onPress={() => setShowNext(true)}
            style={{ backgroundColor: '#2196f3', color: 'white' }}>Next</Button>
        }

        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ textAlign: "center", color: 'black' }}>Already have an account ?</Text></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: '#2196f3',
    marginTop: 10,
    marginBottom: 25,
    fontWeight: 'bold'
  },
  img: {
    width: 200,
    height: 200
  },
  box1: {
    alignItems: "center"
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: "space-evenly",
    height: "50%"
  }
});

