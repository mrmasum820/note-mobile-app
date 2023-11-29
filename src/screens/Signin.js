import { View, Text, SafeAreaView, Platform, StyleSheet, Image, TextInput, Pressable, ActivityIndicator } from 'react-native'
import Button from '../components/Button'
import Input from '../components/Input'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../../App'

export default function Signin({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      // console.log('result', result);
      setLoading(false)
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
    //navigate to home screen
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/signin.jpg')}
        style={styles.image}
      />

      <Text style={styles.text}>Never Forget Your Notes</Text>

      <View style={styles.box}>
        <Input placeholder="Email Address" onChangeText={(text) => setEmail(text)} />
        <Input placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)} />
      </View>

      {loading && <>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color='blue' size='large' />
        </View>
      </>}

      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 40 }}>
        <Button title={"Login"} onPress={login} customStyles={{ alignSelf: 'center', marginBottom: 40 }} />

        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text>Don't have an account? <Text style={{ color: 'green', fontWeight: 'bold' }}>Signup</Text></Text>
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
  }
})