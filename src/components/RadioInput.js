import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function RadioInput({ label, value, setValue, size = 'small' }) {
    const isSelected = value === label;

    return (
        <TouchableOpacity onPress={() => setValue(label)}>
            <View style={styles.radioContainer}>
                <View style={[styles.outerCircle, isSelected && styles.selectOuterCircle, size === 'big']}>
                    <View style={[styles.innerCircle, isSelected && styles.selectedInnerCircle, size === 'big']} />
                </View>
                <Text style={styles.radioText}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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