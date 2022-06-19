import React from "react";
import AuthContextContainer from "Contexts/AuthContext";
import PostsContextContainer from "Contexts/PostsContext";
import Router from "Components/Router/Router";
import styles from "./App.module.css";

function App(): React.ReactElement {
  return (
    <div className={styles.app}>
      <AuthContextContainer>
        <PostsContextContainer>
          <Router />
        </PostsContextContainer>
      </AuthContextContainer>
    </div>
  );
}

export default App;
