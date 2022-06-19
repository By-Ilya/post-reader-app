import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { PostData } from "Api/types";
import { usePostsContext } from "Contexts/PostsContext";
import BlankButton from "Components/Common/BlankButton/BlankButton";
import { ascSortingFunc, isStrContainPattern } from "Helpers/stringUtils";
import InputField from "Components/Common/InputField/InputField";
import { TEXTS } from "Constants/constants";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { POSTS_PATH } from "../../../Router/Router";
import styles from "./UsersList.module.css";

interface UserData {
  userId: string;
  userName: string;
  countPosts: number;
}

export default function UsersList(): React.ReactElement {
  const { page, userPosts, fetchPage } = usePostsContext();

  const { userId } = useParams<{ userId: string }>();
  const navigate: NavigateFunction = useNavigate();

  const [localSearch, setLocalSearch] = useState<string>("");

  const usersData: UserData[] = useMemo<UserData[]>(
    () =>
      Array.from(userPosts.values())
        .map((posts: PostData[]) => ({
          userId: posts[0].from_id,
          userName: posts[0].from_name,
          countPosts: posts.length,
        }))
        .filter((userData: UserData) =>
          isStrContainPattern(userData.userName, localSearch)
        )
        .sort((a: UserData, b: UserData) =>
          ascSortingFunc(a.userName, b.userName)
        ),
    [userPosts.size, userPosts.values(), localSearch]
  );

  useEffect(() => {}, [userId]);

  return (
    <div className={styles.usersListContainer}>
      <div className={styles.searchPanel}>
        <InputField
          placeholder={TEXTS.postsPage.users.searchUsersPlaceholder}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLocalSearch(event.target.value)
          }
        />
      </div>

      <div className={styles.usersList}>
        {usersData.map((user: UserData) => (
          <BlankButton
            key={user.userId}
            type="button"
            className={classNames(
              styles.userContainer,
              user.userId === userId && styles.activeUserContainer
            )}
            onClick={() => navigate(`${POSTS_PATH}/${user.userId}`)}
          >
            <div className={styles.userName}>{user.userName}</div>
            <div className={styles.counter}>{user.countPosts}</div>
          </BlankButton>
        ))}

        {usersData.length === 0 && (
          <div className={styles.emptyList}>
            {TEXTS.postsPage.users.emptyUsersListText}
          </div>
        )}
      </div>

      <div className={styles.fetchMoreContainer}>
        <BlankButton
          type="button"
          className={styles.fetchMoreButton}
          onClick={fetchPage}
          disabled={page >= 10}
        >
          {TEXTS.postsPage.users.fetchMorePostsButtonText}
        </BlankButton>
      </div>
    </div>
  );
}
