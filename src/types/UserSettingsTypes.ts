export type UserDataUpdate = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  photo?: string;
  status?: string;
  uid?: string;
};

export type UserSettingsProps = {
  setUserSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userSettingsModalOpen: boolean;
};
