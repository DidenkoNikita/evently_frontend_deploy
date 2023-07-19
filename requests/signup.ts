import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const signup = async (user: any, router: AppRouterInstance): Promise<void> => {
  const API_URL = process.env.API_URL;
  console.log(API_URL);
  const obj = user.user;
  console.log(obj);
  
  try {
    const response: Response = await fetch(`${API_URL}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({obj})
    });
    const data = await response.json();
    
    console.log('response::', data);

    if (response.status === 201) {
      localStorage.setItem('user_id', JSON.stringify(data.id));
      localStorage.setItem('access_token', JSON.stringify(data.accessToken));
      router.push('/home');
    }
    
  } catch (e) {
    return console.log(e);
  }
};