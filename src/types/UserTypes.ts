export type userSliceType = {
  users: string[];
  // @ts-ignore
  auth: any;
  token: string;
  loginMode: boolean;
  toggleLoginOrSignup: boolean | null;
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
