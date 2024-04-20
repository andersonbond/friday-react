import React, { useState, useEffect } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import axios from 'axios';
import './ChatStream.css';
import friday from '../assets/friday2.png';
import loader from '../assets/loader.gif';
import { play } from 'ionicons/icons';

import About from './About'

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatStream = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [chartMessage, setchartMessage] = useState('')
  
  const [messages, setMessages] = useState([
    {
      message: "",
      sender: ""
    },
  ]);

  const handleGPT = async (message: any) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setTyping(true);
    await processGPT(newMessages);
  };

  useEffect(() => {
    // This effect will scroll to the bottom of the chatbox whenever new messages are added
    const chatbox = document.querySelector(".messages") as HTMLElement;
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [messages]);

  // https://fri.websonicph.xyz/api/v1/chat

  async function processGPT(chatMessages: any) {
    axios
    .post(`http://localhost:8000/api/v1/chat/`, { chatMessages }, {
      headers: {
        // Authorization: `Token ${props.user.token}`,
        "Content-Type": "application/json",
      }
    })
    .then((res) => {

      setchartMessage(res.data.message.content)
      setMessages([
        ...chatMessages,
        {
          message: formatter(res.data.message.content),
          sender: "friday" // Assuming the response comes from Friday
        }
      ]);
      setTyping(false);
    })
    .catch((err) => {
      setTyping(false);
      console.log(err);
    });
  }

  const sendMessage = () => {
    if (input.trim() !== '') {
      handleGPT(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // function convertUrlsToMarkdownLinks(text: any) {
  //   const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
  //   return text.replace(urlRegex, (url:any) => `<${url}>`);
  // }

  function formatter(text: string) {
      const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
      // replace with url
      const urlToMarkdown = text.replace(urlRegex, (url: string) => `<${url}>`);
      // Remove content between first and last pipe '|'
      const pipeContentRegex = /\|[^|]+\|/g;
      const MarkDownFormatter = urlToMarkdown.replace(pipeContentRegex, ''); 
      
      return MarkDownFormatter;
  }


  return (
    <div className='d-flex'>
      <div className="version-info">
        <div>
          <h3>
              CPDO AI v0.1
          </h3>
          <p>
            Notes
          </p>
          <ul>
            <li>
              <strong>Public Use:</strong> Data shared may be used for public access and benefit, subject to applicable laws and regulations.
            </li>
            <li>
              <strong>Non-storage of Personal Information:</strong> We do not store any personal information shared through this application.
            </li>
            <li>
              <strong>SSL Encryption:</strong> To safeguard the confidentiality of user communications, this application utilizes SSL (Secure Sockets Layer) encryption. This encryption protocol ensures that all data exchanged between users and the system is securely transmitted over the internet.
            </li>
          </ul>
          <p>
            We are dedicated to upholding the standards of data privacy and security. If you have any questions or concerns regarding our data policy, please contact us at Davao City Planning Office, Davao City.
          </p>
        </div>
      </div>
        <div className="chatbox">
        <div className="messages">
          {messages.length < 2 && <About />}

          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'friday' ? 'from-friday' : ''}`}>
                {msg.sender === 'friday' && (
                  <div className="friday-label">
                    <img src={friday} alt="Friday" className='friday-icon' />
                    CPDO AI
                  </div>
                )}
                  {msg.sender === 'user' && (
                    <span className="user-label">You <br/></span>
                  )}
                  <div className='message-area'>
                    {msg.message.startsWith("```") ? (
                      <SyntaxHighlighter language={msg.message} style={a11yDark}>
                        {msg.message.replace(/```/g, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <ReactMarkdown
                        children={msg.message}
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer">
                              {props.children}
                            </a>
                          )
                        }}
                      />
                    )}
                  </div>
                  {/* Add the bar chart below */}
                  {/* {msg.sender === 'friday'  && (
                    <div className='p-16'>
                        <ChatGraph messageContent={chartMessage}/>
                    </div>
                  )} */}
            </div>
          ))}
          {typing && (
            <div className="loader">
              <img src={friday} className='friday-icon' /><img src={loader} alt="Loading..." />
            </div>
          )}
        </div>
        <div className="input-area">
          <input
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={typing}
            aria-label="Message CPDO AI..."
            placeholder='Message CPDO AI...'
          />
          <IonButton color="warning" fill="solid" onClick={sendMessage} disabled={typing}>
            Send <IonIcon slot="end" icon={play}></IonIcon>
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default ChatStream;