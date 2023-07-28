import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const signupWithRememberMe = async (user: any, router: AppRouterInstance): Promise<void> => {
  const API_URL = process.env.API_URL;
  
  try {
    const response: Response = await fetch(`${API_URL}signup_remember_me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    });
    const data = await response.json();
    
    if (response.status === 201) {
      sessionStorage.setItem('user_id', JSON.stringify(data.id));
      sessionStorage.setItem('access_token', JSON.stringify(data.accessToken));
      localStorage.setItem('user_id', JSON.stringify(data.id));
      localStorage.setItem('refresh_token', JSON.stringify(data.refreshToken));
      router.push('/home');
    }
    
  } catch (e) {
    return console.log(e);
  }
};