interface Info {
  user2Id: number
}

export const getChatId = async  (info: Info, setChatId: any) => {
  const API_URL = process.env.API_URL;
  const user_id = sessionStorage.getItem('user_id');
  const accessToken = sessionStorage.getItem('access_token');  

  console.log('info', info);
  
  if (!user_id || !accessToken) {
    window.open('http://localhost:3000/');
    return null;
  } else {
    const id = JSON.parse(user_id || '');
    const token = JSON.parse(accessToken || '');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    if (info.user2Id !== 0) {
      try {
        const response: Response = await fetch(`${API_URL}get_chat_id`, {
          method: 'POST',
          headers,
          body: JSON.stringify({user_id: id, ...info})
        });
  
        const data = await response.json();   
        
        if (response.status === 200) {
          setChatId(data.id)
        }
  
        if (response.status === 201) {
          const accessToken = data;
          sessionStorage.setItem('access_token', JSON.stringify(accessToken));
          window.location.reload();
        }
    
        if (response.status === 401) {        
          window.open('http://localhost:3001/');
        }
      } catch (e) {
        return console.log(e);
      }
    } 
  }
};