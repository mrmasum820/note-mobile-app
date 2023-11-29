import { View, Text, SafeAreaView, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input'
import RadioInput from '../components/RadioInput'
import Button from '../components/Button'
import { collection, addDoc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { db } from '../../App'

const noteColorOptions = ['red', 'green', 'blue']

export default function Create({ user, navigation }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [noteColor, setNoteColor] = useState('blue')
  const [loading, setLoading] = useState(false)

  const onPressCreate = async () => {
    setLoading(true)
    try {
      // data to be added
      await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid
      });
      setLoading(false);
      showMessage({
        message: "Note Created Successfully",
        type: "success",
      });
      // when note created, navigate to home
      navigation.goBack();
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>

      <Input placeholder="Title" onChangeText={(text) => setTitle(text)} />

      <Input placeholder="Description" onChangeText={(text) => setDescription(text)} multiline={true} />

      <View style={{ marginTop: 25, marginBottom: 15 }}>
        <Text>Select Your Note Color</Text>
      </View>

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
          <Button title={"Submit"} onPress={onPressCreate} customStyles={{ alignSelf: 'center', marginVertical: 60, width: '100%' }} />
      }

    </SafeAreaView>
  )
}