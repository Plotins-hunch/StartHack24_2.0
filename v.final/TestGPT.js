import OpenAI from "openai";

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';


export default function Chat() {
    const [response, setResponse] = useState('');
  const fetchAIResponse = async () => {
    const apiKey = "GPT Key";
    const reqBody = {
      prompt: "Once upon a time, in a land far, far away, there was a kingdom.",
    };
    try {
      const result = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`, // Replace with your actual API key
        },
        body: JSON.stringify(reqBody),
      });
      
      const data = await result.json();
      setResponse(data.choices[0].text)
    } catch (error) {
      console.error('Error fetching AI response:', error)
    }
  }

  return (
    <View>
      <Button title="Generate AI Text" onPress={fetchAIResponse} />
      <Text>{response}</Text>
    </View>
  )
}