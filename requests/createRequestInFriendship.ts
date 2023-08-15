export const createRequestInFriendship = async  (userId: number, setActiveAlert: any) => {
  const API_URL = process.env.API_URL;
  const user_id = sessionStorage.getItem('user_id');
  const accessToken = sessionStorage.getItem('access_token');  
  
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

    if (userId) {
      try {
        const response: Response = await fetch(`${API_URL}create_notifiaction`, {
          method: 'POST',
          headers,
          body: JSON.stringify({user_id: id, userId})
        });
  
        const data = await response.json();   
        
        if (response.status === 200 && data !== null) {
          setActiveAlert(true);
        } else {
          setActiveAlert(false);
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