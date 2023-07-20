export const requestRememberMe = async (id: string, token: string) => {
  const API_URL = process.env.API_URL;
  const refreshToken = JSON.parse(token || '');
  console.log(refreshToken);
  console.log(token, id);
  
  const userId = JSON.parse(id || '');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };
  
  try {
    console.log('request');
    
    const response: Response = await fetch(`${API_URL}check_remember_me`, {
      method: 'POST',
      headers,
      body: JSON.stringify({user_id: userId})
    });

    const data = await response.json();   
    
    console.log('request::', data);

    if (response.status === 200) {
      return data;
    } else {
      return null;
    }

  } catch (e) {
    return console.log(e);
  }
}