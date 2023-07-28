export const numberCheck = async (number: string): Promise<boolean | void> => {
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
    return data
  } catch (e) {
    return console.log(e);
  }
};