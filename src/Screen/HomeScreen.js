import React,{useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import User from '../tab/User';
import Setting from '../tab/Setting';



const HomeScreen=()=>{
    const [selectedTab,setSelectedTab]=useState(0)
    return(
        <View style={styles.container}>
              {selectedTab == 0 ? <User /> : <Setting />}
            
            <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.tab} onPress={()=>setSelectedTab(0)}>
                    <Image source={require('./assest/user.png')} style={[
              styles.tabIcon,
              { tintColor: selectedTab == 0 ? '':'' },
            ]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={()=>setSelectedTab(1)}>
                    <Image source={require('./assest/setting.png')} style={[
              styles.tabIcon,
              { tintColor: selectedTab == 1 ? 'white' : '#A09F9F' },
            ]}/>
                </TouchableOpacity>

            </View>
        </View>

    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        
},
bottomTab:{
    position:'absolute',
    bottom:0,
    width:'100%',
    height:70,
    backgroundColor:'blue',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
},
tab:{
    width:'50%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
},
tabIcon:{
    height:40,
    width:40
}
})
export default HomeScreen;