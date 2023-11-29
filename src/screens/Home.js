import { View, Text, StatusBar, StyleSheet, SafeAreaView, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../App';


export default function Home({ navigation, route, user }) {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    // create the query
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));

    // listen to the query
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      });
      setNotes(list);
    })

    return notesListenerSubscription;
  }, [])
  // console.log('notes', notes);

  const renderItem = ({ item }) => {
    const { title, description, color } = item;
    return (
      <Pressable
        style={{ backgroundColor: color, marginBottom: 20, padding: 20, borderRadius: 10 }}
        onPress={() => navigation.navigate('Update', { item })}
      >
        <Pressable style={{ position: 'absolute', alignSelf: 'flex-end', padding: 15, zIndex: 4 }}
          onPress={() => {
            deleteDoc(doc(db, "notes", item.id))
          }}
        >
          <AntDesign name="delete" size={24} color="white" />
        </Pressable>

        <Text style={{ color: 'white', fontSize: 24 }}>{title}</Text>
        <Text style={{ color: 'white', fontSize: 18 }}>{description}</Text>
      </Pressable>
    )
  }

  // handle button create
  const handleCreate = () => {
    navigation.navigate('Create');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
        <Text>My Notes</Text>
        <Pressable onPress={handleCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>

      <FlatList data={notes} renderItem={renderItem} keyExtractor={(item) => item.title} contentContainerStyle={{ padding: 20 }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 16
  }
})