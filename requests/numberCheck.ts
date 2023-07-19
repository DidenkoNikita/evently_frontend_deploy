export const numberCheck = async (number: string, setCheckNumber: any ): Promise<void> => {
  const API_URL = process.env.API_URL;
  
  try {
    const response: Response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({number})
    });
    const data = await response.json();

    setCheckNumber(data)    
  } catch (e) {
    return console.log(e);
  }
};