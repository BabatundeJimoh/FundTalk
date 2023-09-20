const ChatMessage = require('../models/chat.js')


exports.saveMessage = async (req, res) => {
  try {
    const { text, user } = req.body; 
    
    const newMessage = new ChatMessage({ text, user });
    await newMessage.save();

    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'An error occurred while saving the message' });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const chatHistory = await ChatMessage.find().sort({ timestamp: 1 });

    res.status(200).json(chatHistory);
  } catch (error) {
    console.error('Error retrieving chat history:', error);
    res.status(500).json({ error: 'An error occurred while retrieving chat history' });
  }
};
