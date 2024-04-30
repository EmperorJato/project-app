import { useAuthAxiosStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {

    const auth = useAuthAxiosStore();
    
    if(auth.isLoggedIn){
       return navigateTo('/dashboard')
    }
})