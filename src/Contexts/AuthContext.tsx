import React, { useContext } from "react";
import { LoginResponse } from "Api/types";
import Api from "Api/Api";
import { TEXTS, EMPTY_STRING } from "Constants/constants";

export interface UserData {
  name: string | null;
  email: string | null;
  slToken: string | null;
}

interface AuthState {
  clientId: string;
  userData: UserData;
  authErrorMessage: string | null;
}

interface AuthFuncs {
  doLogin: (name: string, email: string) => Promise<boolean>;
  doSilentLogin: () => Promise<boolean>;
  getSlToken: () => string | null;
  doLogout: () => void;
}

type IAuthContext = AuthState & AuthFuncs;

export const AuthContext = React.createContext<IAuthContext | any>(null);

const DEFAULT_STATE: AuthState = {
  userData: {
    name: localStorage.getItem("name") || null,
    email: localStorage.getItem("email") || null,
    slToken: localStorage.getItem("slToken") || null,
  },
  clientId: process.env.REACT_APP_CLIENT_ID || EMPTY_STRING,
  authErrorMessage: null,
};

export const useAuthContext = (): IAuthContext =>
  useContext<IAuthContext>(AuthContext);

export default class AuthContextContainer extends React.Component<
  any,
  AuthState
> {
  private readonly funcs: AuthFuncs;

  private readonly api: Api = new Api();

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { ...DEFAULT_STATE };

    this.funcs = {
      doLogin: this.doLogin,
      doSilentLogin: this.doSilentLogin,
      getSlToken: this.getSlToken,
      doLogout: this.doLogout,
    };
  }

  updateLocalStorageUserData = (userData: UserData): void => {
    localStorage.setItem("name", userData.name || EMPTY_STRING);
    localStorage.setItem("email", userData.email || EMPTY_STRING);
    localStorage.setItem("slToken", userData.slToken || EMPTY_STRING);
  };

  setAuthErrorMessage = (authErrorMessage: string | null): void => {
    this.setState({ authErrorMessage });
  };

  doLogin = async (name: string, email: string): Promise<boolean> => {
    try {
      this.setAuthErrorMessage(null);

      const loginResponse: LoginResponse = await this.api.postLogin(
        name,
        email
      );

      if (loginResponse.error || !loginResponse.data) {
        // eslint-disable-next-line no-console
        console.error(
          `${loginResponse.error.code}: ${loginResponse.error.description}`
        );
        this.setAuthErrorMessage(TEXTS.common.requestError);
        return false;
      }

      const { sl_token } = loginResponse.data;
      const newUserData: UserData = { name, email, slToken: sl_token };
      await this.setState({ userData: newUserData });
      this.updateLocalStorageUserData(newUserData);

      return true;
    } catch (err: any) {
      this.setAuthErrorMessage(TEXTS.common.requestError);
      return false;
    }
  };

  doSilentLogin = async (): Promise<boolean> => {
    const { userData } = this.state;

    if (userData.name === null || userData.email === null) {
      return false;
    }

    return this.doLogin(userData.name, userData.email);
  };

  getSlToken = (): string | null => this.state.userData.slToken;

  doLogout = (): void => {
    const newUserData: UserData = { name: null, email: null, slToken: null };
    this.setState({ userData: newUserData });
    this.updateLocalStorageUserData(newUserData);
  };

  render(): React.ReactNode {
    return (
      <AuthContext.Provider value={{ ...this.state, ...this.funcs }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
