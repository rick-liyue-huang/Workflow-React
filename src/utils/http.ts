import * as qs from "qs";
import { apiUrl } from "../pages/project-list";
import * as auth from "../auth-providers";
import { useAuth } from "../context/auth-context";

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpont: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpont += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(`${apiUrl}/${endpont}`, config).then(async (response) => {
    if (response.status === 401) {
      //	401 server side has problems under restful standard
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "re login" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
