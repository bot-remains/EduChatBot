import { chatBotResponse } from '../utils/chatBot.js';

export const chatResponse = async (req, res) => {
  const { statement } = req.body;
  const response = await chatBotResponse(statement);
  res.status(200).json({ message: response });
};
