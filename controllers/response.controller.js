import { chatBotResponse } from '../utils/chatBot.js';

export const chatResponse = async (req, res) => {
  const { statement, conversationHistory } = req.body;
  const response = await chatBotResponse(statement, conversationHistory);
  res.status(200).json({ message: response });
};
