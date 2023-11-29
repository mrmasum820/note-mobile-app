import { View, Text, SafeAreaView, Platform, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from '../components/Button'
import Input from '../components/Input'
import { useState } from 'react'
import { auth, db } from '../../App';
import { collection, addDoc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";

const genderOptions = ['Male', 'Female']

export default function Signup({ navigation }) {
  const [gender, setGender] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(false)


  const handleSignup = async () => {
    setLoading(true)
    try {
      // 1. Create user with email and password
      const result = await createUserWithEmailAndPassword(auth, email, password)
      console.log('result', result)

      // 2. Add user to firestore
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        age: age,
        uid: result.user.uid
      });
      setLoading(false);

    } catch (error) {
      console.log('error', error)
      showMessage({
        message: 'Error Occured',
        type: "danger",
      });
      setLoading(false)
    }

    // 3. navigate to home screen
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Input placeholder="Email Address" onChangeText={(text) => setEmail(text)} />
        <Input placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)} />
        <Input placeholder='Your name' onChangeText={(text) => setName(text)} />
        <Input placeholder='Your age' onChangeText={(text) => setAge(text)} />

        <View style={{ marginBottom: 15 }}>
          <Text>Select Gender</Text>
        </View>

        {
          genderOptions.map((option) => {
            const selected = option === gender;
            return (
              <Pressable onPress={() => setGender(option)} key={option} style={styles.radioContainer}>
                <View style={[styles.outerCircle, selected && styles.selectOuterCircle]}>
                  <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]} />
                </View>
                <Text style={styles.radioText}>{option}</Text>
              </Pressable>
            )
          })
        }

      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 40 }}>

        {
          loading ? <ActivityIndicator color='blue' size='large' />
            :
            <Button title={"Submit"} onPress={handleSignup} customStyles={{ alignSelf: 'center', marginBottom: 40 }} />
        }

        <Pressable onPress={() => navigation.navigate('Signin')}>
          <Text>Already have an account? <Text style={{ color: 'green', fontWeight: 'bold' }}>Signin</Text></Text>
        </Pressable>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0
  },
  box: {
    paddingHorizontal: 16,
    paddingVertical: 25
  },
  image: {
    width: '80%',
    height: 300,
    alignSelf: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#cfcfcf',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderColor: '#cfcfcf',
  },
  radioText: {
    marginLeft: 10
  },
  selectOuterCircle: {
    borderColor: 'orange',
  },
  selectedInnerCircle: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  }
})