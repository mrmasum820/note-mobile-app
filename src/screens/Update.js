import { View, Text, SafeAreaView, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input'
import RadioInput from '../components/RadioInput'
import Button from '../components/Button'
import { updateDoc, doc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { db } from '../../App'

const noteColorOptions = ['red', 'green', 'blue']

export default function Update({ navigation, route }) {
  // get note item using route params
  const noteItem = route.params.item;
  console.log('noteItem title', noteItem.title);
  const [title, setTitle] = useState(noteItem.title)
  const [description, setDescription] = useState(noteItem.description)
  const [noteColor, setNoteColor] = useState(noteItem.color)
  const [loading, setLoading] = useState(false)

  const onPressUpdate = async () => {
    setLoading(true)
    try {
      // data to be updated
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        color: noteColor
      });
      setLoading(false);
      showMessage({
        message: "Note Created Successfully",
        type: "success",
      });
      // when note updated, navigate to home
      navigation.goBack();
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>

      <Input placeholder="Title" onChangeText={(text) => setTitle(text)} value={title} />

      <Input placeholder="Description" onChangeText={(text) => setDescription(text)} multiline={true} value={description} />

      <View style={{ marginTop: 25, marginBottom: 15 }}>
        <Text>Select Your Note Color</Text>
      </View>

      {/* render colors UI using FlatList */}
      {
        noteColorOptions.map((option, index) => (
          <RadioInput
            key={index}
            label={option}
            value={noteColor}
            setValue={setNoteColor}
          />
        )
        )
      }

      {/* show loading indicator when loading */}
      {
        loading ? <ActivityIndicator color='blue' size='large' />
          :
          <Button title={"Submit"} onPress={onPressUpdate} customStyles={{ alignSelf: 'center', marginVertical: 60, width: '100%' }} />
      }

    </SafeAreaView>
  )
}