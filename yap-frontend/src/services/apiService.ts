import axios from 'axios';

export const generateYap = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(
      `https://yap-app-hsit.onrender.com/generate_yap`,
      {
        text_str: text
      },

    );
    yapThisShit(response.data.message)
    return response.data.message;
    
  } catch (error) {
    console.error('Error generating yap:', error);
    throw new Error('Failed to generate yap');
  }
};


export const yapThisShit = async (text:string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);

    window.speechSynthesis.speak(utterance);
  }
}