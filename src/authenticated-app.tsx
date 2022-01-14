import React from "react";
import ProjectListPage from "./pages/project-list";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ProjectListPage />
    </div>
  );
};
