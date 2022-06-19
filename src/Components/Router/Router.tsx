import React, { useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  NavigateFunction,
  HashRouter,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "Contexts/AuthContext";
import { isEmpty } from "Helpers/stringUtils";
import LoginPage from "Components/LoginPage/LoginPage";
import PostsPage from "Components/PostsPage/PostsPage";

const LOGIN_PATH: string = "/login";
export const POSTS_PATH: string = "/posts";

function PagePicker(): React.ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const { userData } = useAuthContext();

  const isAuthorizedUser = (): boolean =>
    !isEmpty(userData.slToken) &&
    !isEmpty(userData.name) &&
    !isEmpty(userData.email);

  useEffect(() => {
    navigate(isAuthorizedUser() ? POSTS_PATH : LOGIN_PATH);
  }, [userData]);

  return (
    <Routes>
      <Route path={LOGIN_PATH} element={<LoginPage />} />
      <Route path={`${POSTS_PATH}/:userId`} element={<PostsPage />} />
      <Route path={POSTS_PATH} element={<PostsPage />} />
      <Route path="*" element={<Navigate to={POSTS_PATH} />} />
    </Routes>
  );
}

export default function Router(): React.ReactElement {
  return (
    <HashRouter>
      <PagePicker />
    </HashRouter>
  );
}
