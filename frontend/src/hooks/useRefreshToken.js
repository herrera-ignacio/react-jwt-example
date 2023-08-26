import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/auth/refresh', {
      withCredentials: true
    });

    // TODO: If refresh fails, clean refresh token and redirect to login
    
    setAuth(prev => {
      return { ...prev, accessToken: response.data.accessToken };
    });
  }

  return refresh;
}

export default useRefreshToken;
