export type userSliceType = {
  users: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auth: any;
  token: string;
  loginMode: boolean;
  toggleLoginOrSignup: boolean;
  loggedUser: string | null;
};

export type UserSliceStateSelector = {
  userStore: {
    users?: string[];
    token?: string;
    toggleLoginOrSignup?: boolean;
    loginMode?: boolean;
    loggedUser?: {
      uid?: string;
      displayName?: string;
      photoURL?: string;
    };
  };
};

export type User = {
  uid: string;
  name: string;
  photo: string;
};

export type UsersProps = {
  users: User[];
};
