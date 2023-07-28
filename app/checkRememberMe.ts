import { requestRememberMe } from "@/requests/requestRememberMe";

export const checkRememberMe = async (router: any) => {
  const token = localStorage.getItem('refresh_token');
  
  const id = localStorage.getItem('user_id');
  if (!token || !id) {
    return null
  } else {
    
    const data = await requestRememberMe(id, token);

    if (data) {
      sessionStorage.setItem('user_id', JSON.stringify(data.id));
      sessionStorage.setItem('access_token', JSON.stringify(data.accessToken));
      router.push('/home')
    }
  }
}