import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Local FAQ answers as fallback
const localFAQs = {
  'are your prices fixed': 'Yes, all our prices are fixed and listed on the website.',
  'can i pre order flowers': 'Yes, you can pre-order flowers up to 7 days in advance.',
  'do you have a mobile application': 'Yes, we have a mobile app for both Android and iOS.',
  'what if my plant is damaged': 'If your plant arrives damaged, please contact support with a photo for a replacement or refund.',
  'what are your delivery hours': 'We deliver daily from 8:00 AM to 6:00 PM, including weekends and holidays.',
  'do you deliver to colombo': 'Yes, we deliver to all areas in Colombo and major cities across Sri Lanka. Delivery fees vary by location.',
  'what payment methods do you accept': 'We accept cash on delivery, credit/debit cards, and mobile payments (Genie, FriMi, and mCash).',
  'can i cancel my order': 'You can cancel your order up to 2 hours before the scheduled delivery time for a full refund.',
  'how do i care for my flowers': 'Place flowers in clean water, trim stems diagonally every 2 days, and keep them away from direct sunlight and heat sources.',
  'do you have wedding packages': 'Yes, we offer special wedding flower packages starting from LKR 25,000. Please visit our Wedding section or contact our sales team for details.'

};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check if question matches local FAQs
  const checkLocalFAQs = (question) => {
    const normalizedQuestion = question.toLowerCase().replace(/[^\w\s]/gi, '');
    for (const [key, answer] of Object.entries(localFAQs)) {
      if (normalizedQuestion.includes(key) || key.includes(normalizedQuestion)) {
        return answer;
      }
    }
    return null;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // First check local FAQs
      const localAnswer = checkLocalFAQs(input);
      if (localAnswer) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        setMessages(prev => [...prev, { text: localAnswer, sender: 'bot' }]);
        return;
      }

      // If no local match, call the API
      const res = await axios.post('http://localhost:5000/ask', 
        { question: input },
        { timeout: 5000 }
      );
      setMessages(prev => [...prev, { text: res.data.answer, sender: 'bot' }]);
    } catch (err) {
      console.error('Error:', err);
      
      // Try local FAQs again if API fails
      const localAnswer = checkLocalFAQs(input) || 
        "I'm having trouble connecting. For immediate help, please call our support team at +94 789031697";
      
      setMessages(prev => [...prev, { text: localAnswer, sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating chat icon */}
      <div
        onClick={() => setOpen(prev => !prev)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          backgroundColor: '#4caf50',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          zIndex: 1000,
          fontSize: 30,
          userSelect: 'none',
        }}
        title={open ? 'Close Chat' : 'Open Chat'}
      >
        {open ? '×' : '💬'}
      </div>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: 320,
            height: 400,
            border: '1px solid #ccc',
            borderRadius: 8,
            backgroundColor: 'white',
            padding: 10,
            boxShadow: '0 4px 16px rgba(24, 23, 23, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
        >
          <h4 style={{ margin: '0 0 10px', color: '#4caf50' }}>Sri Lankan Flower Bot</h4>
          <div
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              paddingRight: 8,
              marginBottom: 10,
              border: '1px solid #eee',
              borderRadius: 4,
              padding: 8,
            }}
          >
            {messages.length === 0 && (
              <div style={{ color: '#888', fontStyle: 'italic' }}>
                <p>Ask me about Sri Lankan flowers!</p>
                <p>Common questions:</p>
                <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                  {Object.keys(localFAQs).map((faq, i) => (
                    <li key={i}>{faq.charAt(0).toUpperCase() + faq.slice(1)}</li>
                  ))}
                </ul>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: 12,
                    backgroundColor: msg.sender === 'user' ? '#4caf50' : '#f1f1f1',
                    color: msg.sender === 'user' ? 'white' : 'black',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: 'left', marginBottom: 8 }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: 12,
                    backgroundColor: '#f1f1f1',
                    color: 'black',
                  }}
                >
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div style={{ display: 'flex' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..."
              style={{
                flexGrow: 1,
                padding: 8,
                borderRadius: 20,
                border: '1px solid #ccc',
                outline: 'none',
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') sendMessage();
              }}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                marginLeft: 8,
                padding: '8px 16px',
                borderRadius: 20,
                border: 'none',
                backgroundColor: '#4caf50',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                opacity: loading ? 0.7 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;