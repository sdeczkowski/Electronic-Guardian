import React, { useRef, useState } from 'react';
function Chat() {
  const [messages, setMessages] = useState([]);
  const [formValue,setFormValue] = useState('')
  setMessages = async(e) =>{
    e.preventDefault();
    await messages.add({
      text: formValue,
    });
    setFormValue("");
  }
  return(
    <div>
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} messages={msg}></ChatMessage>)}
    </div>
    <form onSubmit={setMessages}>
      <input value={formValue} onChange={(e)=>setFormValue(e.target.value)}/>
      <button type="submit">Send</button>
    </form>
    </div>
  )
};
function ChatMessage (prop) {
  const {text} = prop.messages;
  return(
    <div className={'message'}>
      <p>{text}</p>
    </div>
  )
};
export default Chat();