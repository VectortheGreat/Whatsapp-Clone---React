export type userSliceType = {
  users: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auth: any;
  token: string;
  loginMode: boolean;
  toggleLoginOrSignup: boolean;
};

export type loginModeStateSelector = {
  userStore: {
    loginMode: boolean;
  };
};
export type toggleLoginOrSignupStateSelector = {
  userStore: {
    toggleLoginOrSignup: boolean;
  };
};

export type authStateSelector = {
  userStore: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    auth: any;
  };
};

export type tokenStateSelector = {
  userStore: {
    token: string;
  };
};
