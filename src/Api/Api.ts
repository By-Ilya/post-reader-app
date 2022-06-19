import { LoginResponse, PostsResponse } from "Api/types";
import { EMPTY_STRING } from "Constants/constants";

export default class Api {
  private static API_URL: string =
    process.env.REACT_APP_API_URL || EMPTY_STRING;

  private static CLIENT_ID: string =
    process.env.REACT_APP_CLIENT_ID || EMPTY_STRING;

  private static formApiUrl(
    pathName: string,
    queryParams?: Map<string, string | number>
  ) {
    let fullApiUrl: string = `${Api.API_URL}/${pathName}`;

    if (queryParams === undefined || queryParams.size === 0) {
      return fullApiUrl;
    }

    fullApiUrl += "?";
    const urlParamsParts: string[] = [];
    queryParams.forEach((paramValue: string | number, paramKey: string) => {
      urlParamsParts.push(`${paramKey}=${paramValue}`);
    });

    fullApiUrl += urlParamsParts.join("&");

    return fullApiUrl;
  }

  public postLogin = (name: string, email: string): Promise<LoginResponse> => {
    const loginUrl: string = Api.formApiUrl("register");
    const loginOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, client_id: Api.CLIENT_ID }),
    };

    return new Promise<LoginResponse>((resolve, reject) => {
      fetch(loginUrl, loginOptions)
        .then((response: Response) => resolve(response.json()))
        .catch((err: any) => reject(err));
    });
  };

  public getPosts = (slToken: string, page: number): Promise<PostsResponse> => {
    const queryOptions: Map<string, string | number> = new Map<
      string,
      string | number
    >();
    queryOptions.set("sl_token", slToken);
    queryOptions.set("page", page);

    const postsUrl: string = Api.formApiUrl("posts", queryOptions);
    const postsOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    return new Promise<PostsResponse>((resolve, reject) => {
      fetch(postsUrl, postsOptions)
        .then((response: Response) => resolve(response.json()))
        .catch((err: any) => reject(err));
    });
  };
}
