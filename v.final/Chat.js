import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';

export default function Chat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        setMessages([...messages, input]);
        setInput('');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <Text key={index}>{message}</Text>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 10,
        padding: 5,
    },
});