import React, { useMemo, useState } from "react";
import { PostData } from "Api/types";
import { usePostsContext } from "Contexts/PostsContext";
import { ascSortingFunc, descSortingFunc } from "Helpers/dateUtils";
import { isStrContainPattern } from "Helpers/stringUtils";
import Post from "Components/PostsPage/Components/Post/Post";
import InputField from "Components/Common/InputField/InputField";
import { TEXTS, EMPTY_STRING } from "Constants/constants";
import { useParams } from "react-router-dom";
import styles from "./PostsList.module.css";
import BlankButton from "../../../Common/BlankButton/BlankButton";

enum SortMode {
  ASC = 1,
  DESC = -1,
}

export default function PostsList(): React.ReactElement {
  const { userPosts } = usePostsContext();

  const { userId } = useParams<{ userId: string }>();

  const [localSearch, setLocalSearch] = useState<string>("");
  const [sortMode, setSortMode] = useState<SortMode>(SortMode.DESC);

  const posts: PostData[] | null = useMemo<PostData[] | null>(() => {
    if (userId === null || !userPosts.has(userId || EMPTY_STRING)) {
      return null;
    }

    return (userPosts.get(userId || EMPTY_STRING) || [])
      .filter((post: PostData) => {
        if (localSearch.length < 3) {
          return true;
        }

        return isStrContainPattern(post.message, localSearch);
      })
      .sort((a: PostData, b: PostData) =>
        sortMode === SortMode.DESC
          ? descSortingFunc(a.created_time, b.created_time)
          : ascSortingFunc(a.created_time, b.created_time)
      );
  }, [userId, userPosts.values(), localSearch, sortMode]);

  const renderPostsContent = (): React.ReactElement => {
    if (posts === null) {
      return (
        <div className={styles.emptyContainer}>
          {TEXTS.postsPage.posts.emptyContentText}
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className={styles.emptyContainer}>
          {TEXTS.postsPage.posts.noPostsText}
        </div>
      );
    }

    return (
      <div className={styles.postList}>
        {posts.map((post: PostData, index: number) => (
          <Post
            key={`${index}_${post.id}`}
            date={post.created_time}
            message={post.message}
          />
        ))}
      </div>
    );
  };

  const [sortButtonTitle, sortButtonContent] = useMemo<[string, string]>(
    () =>
      sortMode === SortMode.DESC
        ? [TEXTS.postsPage.posts.descSortingButtonText, "↑"]
        : [TEXTS.postsPage.posts.ascSortingButtonText, "↓"],
    [sortMode]
  );

  const handleClickSortButton = (): void => {
    setSortMode((mode: SortMode) =>
      mode === SortMode.DESC ? SortMode.ASC : SortMode.DESC
    );
  };

  return (
    <div className={styles.postsListContainer}>
      {posts !== null && (
        <div className={styles.toolContainer}>
          <InputField
            className={styles.searchField}
            placeholder={TEXTS.postsPage.posts.searchPostsPlaceholder}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setLocalSearch(event.target.value)
            }
          />
          <div className={styles.sortContainer}>
            <BlankButton
              type="button"
              title={sortButtonTitle}
              onClick={handleClickSortButton}
            >
              {sortButtonContent}
            </BlankButton>
          </div>
        </div>
      )}
      {renderPostsContent()}
    </div>
  );
}
