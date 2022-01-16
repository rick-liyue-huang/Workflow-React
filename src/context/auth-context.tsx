import React, { ReactNode, useState } from "react";
import * as auth from "../auth-providers";
import { User } from "../pages/project-list";
import { getToken } from "../auth-providers";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageError, FullPageLoading } from "../components/libs";

interface AuthForm {
  username: string;
  password: string;
}

// solve the refresh page problems
const refreshUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // here use 'http' to config the endpoint of 'me'
    const data = await http("me", { token });
    user = data.user;
    return user;
  }
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);

  // when refresh the project list, it will use useAsync to get the loading state
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    // refreshUser().then(setUser);
    run(refreshUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must use in AuthProvider");
  }
  return context;
};
