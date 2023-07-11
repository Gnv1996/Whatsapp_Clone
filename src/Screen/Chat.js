import { View,TouchableOpacity,Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, Bubble ,Send} from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();
  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
      
    subscriber.onSnapshot(querysnapshot => {
      const allmessages = querysnapshot.docs.map(item => {
        return { ...item._data, createdAt: item._data.createdAt };
      });
      setMessageList(allmessages);
    });
    return () => subscriber();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessageList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#ece5dd',
            borderTopLeftRadius: 0,
            marginLeft: -40,
          },
          right: {
            borderBottomRightRadius: 0,
            backgroundColor: '#40b7ad'
          }
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}

        renderSend={props=>{
          return(
            <View style={{flexDirection:'row',alignItems:'center',height:60}}>
              
              <TouchableOpacity style={{marginRight:10}} onPress={()=>{alert('Select your Gallary photo clicked')}}>
                <Image source={require('./assest/gallery.png')} style={{height:30,width:30,margin:5}} />
              </TouchableOpacity>
             <Send {...props}>
              <Image source={require('./assest/send.png')} style={{height:30,width:30,marginRight:10}}/>
    
             </Send>
              </View>
          )
    
         }}
       
        renderBubble={renderBubble}
      />
    </View>
  );
};

export default Chat;