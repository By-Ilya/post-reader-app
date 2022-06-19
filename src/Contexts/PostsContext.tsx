import React, { useContext } from "react";
import { PostsResponse, PostData } from "Api/types";
import Api from "Api/Api";
import { AuthContext } from "Contexts/AuthContext";
import { TEXTS } from "Constants/constants";

interface PostsState {
  page: number;
  userPosts: Map<string, PostData[]>;
  fetchPostsErrorMessage: string | null;
}

interface PostsFuncs {
  fetchPage: () => void;
  clearState: () => void;
}

type IPostsContext = PostsState & PostsFuncs;

const PostsContext = React.createContext<IPostsContext | any>(null);

const DEFAULT_STATE: PostsState = {
  page: 0,
  userPosts: new Map<string, PostData[]>(),
  fetchPostsErrorMessage: null,
};

export const usePostsContext = (): IPostsContext =>
  useContext<IPostsContext>(PostsContext);

class ContextContainer extends React.Component<any, PostsState> {
  private readonly funcs: PostsFuncs;

  private readonly api: Api = new Api();

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { ...DEFAULT_STATE };

    this.funcs = {
      fetchPage: this.fetchPage,
      clearState: this.clearState,
    };
  }

  fetchPage = (): void => {
    if (this.state.page >= 10) {
      return;
    }

    this.setState((state: PostsState) => {
      this.setState({ page: state.page + 1 });
    }, this.doFetch);
  };

  updateLocalPosts = (fetchedPosts: PostData[]): void => {
    const { userPosts } = this.state;

    fetchedPosts.forEach((postData: PostData) => {
      const { from_id } = postData;

      if (userPosts.has(from_id)) {
        userPosts.get(from_id)?.push(postData);
        return;
      }

      userPosts.set(from_id, [postData]);
    });

    this.setState({ userPosts });
  };

  doFetch = async (): Promise<void> => {
    try {
      const { authValue } = this.props;
      const { page } = this.state;

      const slToken: string | null = authValue.getSlToken();
      if (slToken === null) {
        return;
      }

      const postsResponse: PostsResponse = await this.api.getPosts(
        slToken,
        page
      );

      if (postsResponse.error) {
        if (postsResponse.error.code === TEXTS.common.invalidTokenError) {
          await authValue.doSilentLogin();
          await this.doFetch();
          return;
        }

        // eslint-disable-next-line no-console
        console.error(
          `${postsResponse.error.code}: ${postsResponse.error.message}`
        );
        this.setState({ fetchPostsErrorMessage: TEXTS.common.requestError });

        return;
      }
      if (!postsResponse.data) {
        this.setState({ fetchPostsErrorMessage: TEXTS.common.requestError });
        return;
      }

      this.updateLocalPosts(postsResponse.data.posts);
    } catch (err: any) {
      this.setState({ fetchPostsErrorMessage: TEXTS.common.requestError });
    }
  };

  clearState = (): void => {
    this.setState({ ...DEFAULT_STATE });
  };

  render(): React.ReactNode {
    return (
      <PostsContext.Provider value={{ ...this.state, ...this.funcs }}>
        {this.props.children}
      </PostsContext.Provider>
    );
  }
}

export default function PostsContextContainer(props: Readonly<{}>) {
  return (
    <AuthContext.Consumer>
      {(value: any) => <ContextContainer authValue={value} {...props} />}
    </AuthContext.Consumer>
  );
}
