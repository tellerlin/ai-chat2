import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');

    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY`
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V2.5',
        messages: [
          { role: 'user', content: input }
        ],
        stream: false
      })
    });

    const data = await response.json();
    setMessages([...messages, { sender: 'ai', text: data.choices[0].message.content }]);
  };

  return (
    <div>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${msg.sender}: ${msg.text}`} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Type a message"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={sendMessage} style={{ marginTop: '10px' }}>
        Send
      </Button>
    </div>
  );
};

export default Chat;
