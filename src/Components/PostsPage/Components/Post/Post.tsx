import React from "react";
import { formatDate } from "Helpers/dateUtils";
import styles from "./Post.module.css";

interface PostProps {
  key: string;
  date: string;
  message: string;
}

export default function Post(props: PostProps): React.ReactElement {
  const { key, date, message } = props;

  return (
    <div key={key} className={styles.postContainer}>
      <div className={styles.postDate}>{formatDate(date)}</div>
      <div className={styles.postMessage}>{message}</div>
    </div>
  );
}
