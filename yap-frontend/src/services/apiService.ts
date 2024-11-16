import axios from 'axios';

export const generateYap = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(
      `https://yap-app-hsit.onrender.com/generate_yap`,
      {},
      {
        params: { text_str: encodeURIComponent(text) },
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data.message;
  } catch (error) {
    console.error('Error generating yap:', error);
    throw new Error('Failed to generate yap');
  }
};
