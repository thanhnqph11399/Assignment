import React, { useState, useEffect, useMemo } from "react";
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
import "firebase/database";
import "firebase/functions";
import "firebase/storage";
import "firebase/firestore";


export default function Home({ navigation }) {
  const [duLieu,setDuLieu]=useState([]);

  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyCtYxys0SZCR42KzMug4LjGsC65cc1vaNM",
      authDomain: "demoreact-ae3d3.firebaseapp.com",
      databaseURL: "https://demoreact-ae3d3-default-rtdb.firebaseio.com",
      projectId: "demoreact-ae3d3",
      storageBucket: "demoreact-ae3d3.appspot.com",
      messagingSenderId: "738520764683",
      appId: "1:738520764683:web:91e8ddada7a712ef70d20e",
      measurementId: "G-F4V87W74FK",
    };
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
      console.log("Kết nối Firebase thành công!")
    }

    getData();
  }, []);

  function addData(imageId, name,views) {
    firebase.database().ref('images/'+imageId).set({
      Name : name,
      Views : views,
    }, function(error) {
      if (error) {
        // The write failed...
        alert('Loi')
      } else {
        // Data saved successfully!
        alert('Thanh cong!!!')
      }
    });
  }

  function getData() {
    firebase.database().ref("images/").on("value", function(snapshot) {
      let array = [];
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        array.push({
          id: childSnapshot.key,
          Name: childData.Name ,
          Views: childData.Views,
        });
      });
      setDuLieu(array);
    });
  }

  const numColumns = 2;

  const randomBool = useMemo(() => Math.random() < 0.5, []);

  const formatData = (duLieu, numColumns) => {
    let totalRows = duLieu.length % numColumns;
    console.log("" + totalRows);

    while (totalRows !== 0 && totalRows !== numColumns) {
      duLieu.push({ key: "blank", empty: true });
      totalRows++;
    }
    return duLieu;

  };
  return (
    <View style={{ flex: 1, backgroundColor: "#212020" }}>
      <FlatList
        data={formatData(duLieu, numColumns)}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <TouchableOpacity
            style={styles.itemStyle}
            resizeMode="stretch"
            onPress={() => {
              navigation.navigate("Item", { data: item.Name });
            }}>
            <ImageBackground source={{ uri: item.Name }} resizeMode="cover"
                             borderRadius={10}
                             style={{
                               height: randomBool ? 220 : 350,
                               width: "100%",
                               alignSelf: "stretch",borderRadius:5
                             }}>
              <Text style={styles.viewItem}>{item.Views}   views</Text>
            </ImageBackground>
          </TouchableOpacity>} />

    </View>
  );

}

const styles = StyleSheet.create({
  itemStyle: {
    position:'relative',
    flex: 1,
    margin: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 2,
    marginTop:10
  },
  textItem: {
    color: "#fff",
    fontSize: 20,
  },
  viewItem:{
    position: 'absolute',
    bottom:5,
    left:10
  }
});
