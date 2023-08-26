import { useEffect } from "react"
import { axiosPrivate } from "../api/axios"
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization'] && auth?.accessToken) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      error => Promise.reject(error)
    );

    // If token expired, use refresh token!
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;

        // If user is forbidden due to session expired, request a new access token.
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // We use this flag to avoid a loop, requests will be re-attempted only once.
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }

        // If auth failed then clear data to ask for a new login.
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          setAuth({});
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [auth, setAuth, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
