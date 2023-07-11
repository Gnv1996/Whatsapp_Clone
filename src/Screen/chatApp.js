import { View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';
import MapView from 'react-native-maps';


const Chats = () => {
  const [messageList, setMessageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
const [selectedVideo, setSelectedVideo] = useState(null);
const [selectedLocation, setSelectedLocation] = useState(null);
  const route = useRoute();


const handleSelectImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.error) {
        setSelectedImage(response);
        setSelectedVideo(null);
        setSelectedLocation(null);
      }
    });
  };
  
  const handleSelectVideo = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'video' }, response => {
      if (!response.didCancel && !response.error) {
        setSelectedVideo(response);
        setSelectedImage(null);
        setSelectedLocation(null);
      }
    });
  };
  
  const handleSelectLocation = () => {
    // Implement code to open map view and allow the user to select a location
    // Use the MapView component from react-native-maps library to display the map
  };




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


      if (selectedImage) {
        // Upload the selected image to Firebase storage or your preferred storage solution
        // Retrieve the URL of the uploaded image and include it in the message object
        
        // Example code:
  const imageUrl = await uploadImageToStorage(selectedImage.uri);
        myMsg.image = imageUrl;
      } else if (selectedVideo) {
        // Upload the selected video to Firebase storage or your preferred storage solution
        // Retrieve the URL of the uploaded video and include it in the message object
        
        // Example code:
        const videoUrl = await uploadVideoToStorage(selectedVideo.uri);
        myMsg.video = videoUrl;
      } else if (selectedLocation) {
        myMsg.location = selectedLocation;
      }
    
      // ...
    
      setSelectedImage(null);
      setSelectedVideo(null);
      setSelectedLocation(null);

  }, [selectedImage, selectedVideo, selectedLocation]);

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
        renderBubble={renderBubble}
      />
      <Button title="Select Image" onPress={handleSelectImage} />
      <Button title="Select Video" onPress={handleSelectVideo} />
      <Button title="Select Location" onPress={handleSelectLocation} />
    </View>
  );
};

export default Chats;