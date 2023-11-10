import { authFBConfig } from "../../../../../config/config";
import { UserDataUpdate } from "../../../../../types/UserSettingsTypes";

type AccountDetailsProps = {
  fetchedDatas: UserDataUpdate;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({ fetchedDatas }) => {
  return (
    <div>
      <div className="flex space-x-10 bg-slate-200 p-2 rounded-md text-black">
        <div>
          <img
            src={authFBConfig.currentUser?.photoURL ?? ""}
            alt=""
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>
        <div className="grid grid-cols-2">
          <p>{authFBConfig.currentUser?.displayName}</p>
          <p>{authFBConfig.currentUser?.email}</p>
          <p>{authFBConfig.currentUser?.phoneNumber}</p>
        </div>
      </div>
      <div className="flex flex-wrap mt-3 bg-slate-200 p-2 rounded-md text-black space-x-2">
        <h1 className="font-bold">Status:</h1>
        <p className="max-w-[400px] inline-block">{fetchedDatas.status}</p>
      </div>
    </div>
  );
};

export default AccountDetails;
