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
import MasonryList from "@appandflow/masonry-list";


export default function Home({ navigation }) {
  const duLieu = [
    { name: "https://i.pinimg.com/564x/59/a4/c4/59a4c4ee5defe549877f6a88b5f77fe8.jpg", idName: 1 },
    { name: "https://i.pinimg.com/236x/74/ae/89/74ae89d90826fd4dd6936727eb0bd2a7.jpg", idName: 2 },
    { name: "https://i.pinimg.com/564x/34/d2/6c/34d26ceb8747d157c3bc47177a05c4fb.jpg", idName: 5 },
    { name: "https://i.pinimg.com/236x/bb/43/52/bb435210cc24092341522f12de4c5b8b.jpg", idName: 3 },
    { name: "https://i.pinimg.com/236x/40/fe/24/40fe24e9e802623d403b8c78a9b8a555.jpg", idName: 4 },

  ];

  const numColumns = 2;

  const randomBool = useMemo(() => Math.random() < 0.5, []);
  return (
    <View style={{ flex: 1 }}>

      {/*<Image source={{uri:duLieu[0].name}} style={{width: '50%',height:'50%'}}/>*/}
      <MasonryList
        data={duLieu}
                   getHeightForItem={(item)=>item.maxHeight+2}
                   numColumns={numColumns}
                   keyExtractor={(item, index) => index.toString()}
                   renderItem={({ item }) =>
                     <View style={styles.itemStyle} resizeMode="stretch">
                       <ImageBackground source={{ uri: item.name }} resizeMode="cover"
                                        style={{
                                          height: randomBool ? 150 : 280,
                                          width: "100%",
                                          alignSelf: "stretch",
                                          borderWidth: 2,
                                        }}>
                         <Text style={styles.textItem}>{item.idName}</Text>
                       </ImageBackground>
                     </View>} />

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    width: 300,
    minHeight: 100,
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemStyle: {
    height: 100,
    flex: 1,
    backgroundColor: "blue",
    margin: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textItem: {
    color: "#fff",
    fontSize: 20,
  },
});
