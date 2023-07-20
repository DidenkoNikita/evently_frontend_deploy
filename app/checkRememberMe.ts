import { requestRememberMe } from "@/requests/requestRememberMe";

export const checkRememberMe = async (router: any) => {
  const token = localStorage.getItem('refresh_token');
  console.log(token);
  
  const id = localStorage.getItem('user_id');
  if (!token || !id) {
    return null
  } else {
    console.log('ok');
    
    const data = await requestRememberMe(id, token);

    console.log(data);
    
    
    if (data) {
      console.log('ахуенна');
      sessionStorage.setItem('user_id', JSON.stringify(data.id));
      sessionStorage.setItem('access_token', JSON.stringify(data.accessToken));
      router.push('/home')
    }
  }
}