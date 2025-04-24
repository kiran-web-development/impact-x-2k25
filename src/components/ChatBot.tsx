import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextInput, Text, ScrollArea, Paper, Group } from '@mantine/core';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

const medicalQA: { [key: string]: string } = {
  'what is ai in medical imaging': 'AI in medical imaging refers to the use of artificial intelligence algorithms to analyze medical images for diagnosis and treatment.',
  'how accurate is the detection': 'Our system achieves over 95% detection accuracy using advanced deep learning models.',
  'can you help me upload images': 'Yes, you can upload medical images using the upload section on the main page.',
  'what types of images are supported': 'We support various medical image formats including X-rays, MRIs, CT scans, and DICOM files.',
  'how to contact support': 'You can contact support via the contact form available in the footer section of the website.',
  'What is the primary purpose of this AI-based system?': 'The system is designed to analyze medical images like X-rays, MRIs, and CT scans to detect early signs of diseases such as cancer, heart conditions, or neurological disorders with a high degree of accuracy. It provides real-time diagnostic suggestions to assist healthcare professionals in making timely and accurate decisions.',
  'What types of diseases can the system detect?': 'The system can identify signs of diseases such as cancer, heart conditions, and neurological disorders.',
    'What functionalities does the system offer?': 'The system analyzes medical images to detect diseases, provides real-time diagnosis suggestions, supports various image formats, integrates with existing medical software, and incorporates diagnostic accuracy checks to improve reliability.',
    'How does the system handle various image formats?': 'It supports multiple medical image formats, including X-rays, MRIs, and CT scans, ensuring compatibility with a wide range of medical imaging equipment.',
    'How are diagnostic accuracy checks performed?': 'Diagnostic accuracy checks are implemented using advanced algorithms to validate the reliability of the AI\'s analysis, ensuring accurate and consistent diagnoses.',
    'What is the systems expected response time for diagnosis suggestions?': 'The system is designed to provide diagnosis suggestions within less than 5 seconds.',
    'Can the system operate in offline mode?': 'Yes, the system can run in offline mode under certain conditions to ensure functionality even in areas with limited internet access.',
    'Is the system compatible with low-specification devices?': 'Yes, the system is optimized to run on low-spec devices like mobile phones and laptops to ensure accessibility.',
    'How accurate is the system in detecting medical conditions?': 'The system is designed to achieve diagnostic accuracy of 95% or higher.',
    'How is real-time diagnosis achieved?': 'The system utilizes high-speed AI algorithms and powerful computing to analyze medical images instantaneously, providing real-time diagnostic suggestions.',
    'Does the system integrate with existing medical software?': 'Yes, it is built to integrate seamlessly with current medical software platforms, allowing for smooth workflow integration.',
    'What precautions ensure data security and privacy?': 'The system follows strict data security protocols, ensuring patient information is encrypted and handled with confidentiality.',
    'Can this AI-based system be used in rural areas with limited resources?': 'Absolutely! The offline mode and compatibility with low-spec devices make it ideal for deployment in resource-constrained environments.'

  // Add more Q&A as needed
};

const greetings = [
  "Hello! Welcome to MedScan.AI. How can I assist you today?",
  "Hi there! I'm here to help you with medical imaging questions and navigation.",
  "Greetings! Ask me anything about our medical AI system or how to use the site.",
];

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Greet new user on first open
    if (showChat && messages.length === 0) {
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([{ from: 'bot', text: greeting }]);
    }
  }, [showChat]);

  useEffect(() => {
    // Scroll to bottom on new message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { from: 'user', text: input.trim() };
    setMessages((msgs) => [...msgs, userMessage]);

    // Simple keyword matching for answers
    const question = input.toLowerCase();
    let answer = "Sorry, I don't have an answer for that. You can try asking about medical imaging or site navigation.";

    for (const key in medicalQA) {
      if (question.includes(key)) {
        answer = medicalQA[key];
        break;
      }
    }

    // Navigation commands
    if (question.includes('go to home') || question.includes('navigate home')) {
      window.location.href = '/';
      answer = 'Navigating to Home page.';
    } else if (question.includes('go to features') || question.includes('show features')) {
      window.location.href = '#features';
      answer = 'Navigating to Features section.';
    } else if (question.includes('contact') || question.includes('support')) {
      window.location.href = '#footer';
      answer = 'Navigating to Contact/Support section.';
    }

    const botMessage: Message = { from: 'bot', text: answer };
    setTimeout(() => {
      setMessages((msgs) => [...msgs, botMessage]);
    }, 500);

    setInput('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 320,
        maxHeight: 400,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderRadius: 8,
        backgroundColor: 'white',
        zIndex: 1500,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper withBorder p="xs" style={{ cursor: 'pointer' }} onClick={() => setShowChat(!showChat)}>
        <Text style={{ fontWeight: 700, textAlign: 'center' }}>
          {showChat ? 'Close Chat' : 'Chat with us'}
        </Text>
      </Paper>
      {showChat && (
        <>
          <ScrollArea
            style={{ flex: 1, padding: '0 10px' }}
            viewportRef={scrollRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.from === 'bot' ? 'flex-start' : 'flex-end',
                  marginBottom: 8,
                }}
              >
                <Paper
                  withBorder
                  p="sm"
                  style={{
                    maxWidth: '75%',
                    backgroundColor: msg.from === 'bot' ? '#f1f3f5' : '#228be6',
                    color: msg.from === 'bot' ? 'black' : 'white',
                    borderRadius: 12,
                  }}
                >
                  <Text size="sm">{msg.text}</Text>
                </Paper>
              </div>
            ))}
          </ScrollArea>
          <div style={{ padding: 8, display: 'flex', gap: 8, flexWrap: 'nowrap' }}>
            <TextInput
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              style={{ flex: 1 }}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </>
      )}
    </div>
  );
};
