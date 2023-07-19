export const request = async (patch: string, info: {}, method: string) => {
  const API_URL = process.env.API_URL;
  const user_id = localStorage.getItem('user_id');
  const accessToken = localStorage.getItem('access_token');  

  if (!user_id || !accessToken) {
    window.open('http://localhost:3000/401');
    return null;
  } else {
    const id = JSON.parse(user_id || '');
    const token = JSON.parse(accessToken || '');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  
    try {
      const response: Response = await fetch(`${API_URL}${patch}`, {
        method: method,
        headers,
        body: JSON.stringify({user_id: id, ...info})
      });

      const data = await response.json();   
      
      console.log('request::', data);

      if (response.status === 200) {
        return data;
      }

      if (response.status === 201) {
        const accessToken = data;
        localStorage.setItem('access_token', JSON.stringify(accessToken));
        alert('Repeat please')
      }
  
      if (response.status === 401) {
        console.log('curwa matka');
        
        window.open('http://localhost:3001/401');
      }
    } catch (e) {
      return console.log(e);
    }
  }
};