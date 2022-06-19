import React, { useEffect } from "react";
import { useAuthContext } from "Contexts/AuthContext";
import { usePostsContext } from "Contexts/PostsContext";
import PageHeader from "Components/PostsPage/Components/PageHeader/PageHeader";
import UsersList from "Components/PostsPage/Components/UsersList/UsersList";
import PostsList from "Components/PostsPage/Components/PostsList/PostsList";
import styles from "./PostsPage.module.css";

export default function PostsPage(): React.ReactElement {
  const { doLogout } = useAuthContext();
  const { fetchPage, clearState } = usePostsContext();

  useEffect(() => {
    fetchPage();
  }, []);

  const handleLogout = (): void => {
    clearState();
    doLogout();
  };

  return (
    <div className={styles.pageContainer}>
      <PageHeader onLogout={handleLogout} />

      <UsersList />
      <PostsList />
    </div>
  );
}
