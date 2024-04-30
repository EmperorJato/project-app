import { useAuthAxiosStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {

    const auth = useAuthAxiosStore();

    if (to.path === '/') {
        return navigateTo('/dashboard')
    }

    if (!auth.isLoggedIn) {
        return navigateTo('/login')
    }
})