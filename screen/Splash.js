import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"


export default function Splash({navigation}) {
  setTimeout(
    () => {
      navigation.navigate('Home');
    }, 3000,
  );

    return (
        <View style={styles.container}>
          <ImageBackground style={{ width: "100%", height: "100%" }} source={require("../images/bg_hello.jpg")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
