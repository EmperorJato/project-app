import axios from 'axios'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig();
    const instance = axios.create({
        withCredentials: true,
        baseURL : config.public.baseURL as string,
        headers: {
            Accept : 'application/json',
            'Content-Type': 'application/json',
        }
    })

    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = localStorage.getItem('token');
    
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    
        return config;
    }, function (error) {
        if (error.response) {
            if (error.response.status === 401) {
              // Redirect to login page
              localStorage.removeItem('token');

              navigateTo('/login')

            } else {
              // Show a generic error message
              alert('An error occurred. Please try again later.')
            }
          }
        return Promise.reject(error);
    });

    return {
        provide : {
          axios: instance
        }
    }
})