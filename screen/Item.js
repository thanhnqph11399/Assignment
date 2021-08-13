import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  ImageBackground, PermissionsAndroid,
} from "react-native";
import RNFetchBlob from 'rn-fetch-blob';


export default function Item({ route }) {

  const { data } = route.params;

  const checkPermission = async () => {

    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = data;
    // Getting the extention of the file
    let ext = getExtent(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {

      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        quality:'1080px',
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtent = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
      /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: data }} resizeMode="contain" style={{ width: "100%", height: "100%" }} />
      {/*<Picker style={{width: 100, height: 50, borderWidth: 0, fontSize: 20, alignItems: 'center'}}*/}
      {/*        selectedValue={valueSource ? valueSource.language : null}*/}
      {/*        onValueChange={(itemValue) => setValueSource({language: itemValue})}*/}
      {/*>*/}
      {/*  {duLieu.map((item, i) => {*/}
      {/*    return <Picker.Item key={i} value={item.language} label={item.language}/>*/}
      {/*  })}*/}
      {/*</Picker>*/}
      <View style={styles.itemDown3}>
        <Text  style={{color:'#fff',fontSize:15}} onPress={checkPermission}>1200x1600</Text>
      </View>
      <View  style={styles.itemDown2}>
        <Text style={{color:'#fff',fontSize:15}} onPress={checkPermission}>768x1024</Text>
      </View>
      <View  style={styles.itemDown1}>
        <Text style={{color:'#fff',fontSize:15}} onPress={checkPermission}>375x500</Text>
      </View>
      <View  style={styles.itemDown}>
        <Text style={{color:'#fff',fontSize:40}}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
    backgroundColor: "#201e1e",
    alignItems: "center",
    justifyContent: "center",
  },
  itemDown: {
    position: 'absolute',
    bottom:20,
    right:10,
    alignItems: "center",
    justifyContent: "center",
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor: 'red',
    fontSize:5,
    color:'#fff'
  },
  itemDown1:{
    position: 'absolute',
    bottom:120,
    right:10,
    alignItems: "center",
    justifyContent: "center",
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor: 'red',
    fontSize:20,
    color:'#fff'
  },
  itemDown2:{
    position: 'absolute',
    bottom:220,
    right:10,
    alignItems: "center",
    justifyContent: "center",
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor: 'red',
    fontSize:20,
    color:'#fff'
  },
  itemDown3:{
    position: 'absolute',
    bottom:320,
    right:10,
    alignItems: "center",
    justifyContent: "center",
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor: 'red',
    fontSize:20,
    color:'#fff'
  }
});
