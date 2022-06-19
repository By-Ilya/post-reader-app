export interface LoginResponse {
  error: {
    code: string;
    description: string;
    message: string;
  };
  data: {
    sl_token: string;
    client_id: string;
    email: string;
  };
  meta: {
    request_id: string;
  };
}

export interface PostData {
  created_time: string;
  from_id: string;
  from_name: string;
  id: string;
  message: string;
  type: string;
}

export interface PostsResponse {
  error: {
    code: string;
    description: string;
    message: string;
  };
  data: {
    page: number;
    posts: PostData[];
  };
  meta: {
    request_id: string;
  };
}
