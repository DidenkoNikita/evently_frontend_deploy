export const request = async (patch: string, method: string) => {
  const API_URL = process.env.API_URL;

  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response: Response = await fetch(`${API_URL}${patch}`, {
      method: method,
      headers,
    });
    const data = await response.json();       

    if (response.status === 200) {      
      return data;
    }

  } catch (e) {
    return console.log(e);
  }
};