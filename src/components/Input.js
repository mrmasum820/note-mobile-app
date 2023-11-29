import { TextInput, StyleSheet, onChangeText } from 'react-native'
import React from 'react'

export default function Input({ placeholder, secureTextEntry, onChangeText, multiline }) {
    return (
        <TextInput
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            style={styles.input}
            multiline={multiline}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 25
    }
})