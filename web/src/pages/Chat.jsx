// Chat.jsx
import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Cześć, jak mogę Ci dzisiaj pomóc?',
      user: 'React Native',
      isMe: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, user: 'Me', isMe: true }]);
      setNewMessage('');
    }
  };

  const [conversations, setConversations] = useState([
    { id: 1, name: 'Anna Nowak' },
    { id: 2, name: 'Maria Maria' },
    // ... dodaj więcej osób
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Tutaj możesz dodać logikę przeszukiwania listy osób
    console.log('Szukaj:', searchQuery);
  };

  const handleNewConversation = () => {
    // Tutaj możesz dodać logikę tworzenia nowej konwersacji
    console.log('Utwórz nową konwersację');
  };



  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      
      <div style={{ flex: 3, borderRight: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
        
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Wyszukaj..."
            style={{ borderRadius: '5px', marginRight: '5px' }}
          />
          <button onClick={handleSearch} style={{ borderRadius: '5px',backgroundColor:'#007AFF' }}>Szukaj</button>
        </div>

        {/* Lista osób */}
        <div style={{ overflowY: 'scroll', marginTop: '10px' }}>
          {conversations.map((person) => (
            <div key={person.id} style={{ cursor: 'pointer', marginBottom: '5px', borderRadius: '5px', padding: '5px' }}>
              {person.name}
            </div>
          ))}
        </div>

        {/* Przycisk do utworzenia nowej wiadomości */}
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleNewConversation} style={{ borderRadius: '20px', padding: '10px',backgroundColor:'#007AFF' }}>Utwórz nową wiadomość</button>
        </div>
        
      </div>

      {/* Prawa sekcja (3:7) */}
      <div style={{ flex: 7, borderRadius: '10px',display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', borderRadius: '10px',flex:1 }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ textAlign: msg.isMe ? 'right' : 'left', marginBottom: '10px', borderRadius: '5px', padding: '10px' }}>
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderTop: '1px solid #ccc', borderRadius: '10px'}} >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Wpisz wiadomość..."
            style={{ borderRadius: '5px', marginRight: '5px', padding: '5px' }}
          />
          <button onClick={handleSendMessage} style={{ borderRadius: '20px', padding: '10px',backgroundColor:'#007AFF' }}>Wyślij</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
