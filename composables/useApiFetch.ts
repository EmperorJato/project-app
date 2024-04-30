import type { UseFetchOptions } from "nuxt/app";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig();

  let headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

//   const token = useCookie("XSRF-TOKEN");

//   if (token.value) {
//     headers["X-XSRF-TOKEN"] = token.value as string;
//   }

  const baseURL = config.public.baseURL as string;

  return useFetch(baseURL + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
    onRequest({ request, options }) {
      const headers = options?.headers
        ? new Headers(options.headers)
        : new Headers();
      const token = useCookie("accessToken");

      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
    onRequestError({ request, options, error }) {
        console.log(error)
          return Promise.reject(error)
    },
  });
}
