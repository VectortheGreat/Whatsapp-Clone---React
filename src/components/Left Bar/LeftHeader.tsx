import { signOut } from "firebase/auth";
import { BsChatRightDots } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { loginModeToggle, tokenInfo } from "../../redux/userSlice";
import { authFBConfig } from "../../config/config";
import { UserSliceStateSelector } from "../../types/UserTypes";

type LeftHeaderProps = {
  setToggleMessageUserBar: (chatMode: boolean) => void;
};
const LeftHeader: React.FC<LeftHeaderProps> = ({ setToggleMessageUserBar }) => {
  const token = useSelector(
    (state: UserSliceStateSelector) => state.userStore.token
  );

  const loggedUser = useSelector(
    (state: UserSliceStateSelector) => state.userStore.loggedUser
  );
  const auth = authFBConfig;
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (token) {
      signOut(auth)
        .then(() => {
          console.log("Signed out successfully");
        })
        .catch((error) => {
          console.error(error);
        });
      dispatch(tokenInfo(""));
      dispatch(loginModeToggle());
      auth.onAuthStateChanged((user) => {
        if (user) {
          localStorage.removeItem("user");
        }
      });
    } else {
      console.error("User is not authenticated. Cannot sign out.");
    }
  };

  return (
    <div className="col-span-4 p-2">
      {token ? (
        <div className="flex justify-between items-center px-2">
          <div className="flex space-x-5">
            <img
              src={loggedUser.photoURL}
              alt="Profile Picture"
              className="w-12 h-12 object-cover rounded-full"
            />
            <h1 className="mt-1">{loggedUser.displayName as string}</h1>
          </div>
          <div className="flex space-x-4">
            <BsChatRightDots
              size={24}
              className="cursor-pointer hover:text-rose-600"
              onClick={() =>
                setToggleMessageUserBar(
                  (prevToggleMessageUserBar) => !prevToggleMessageUserBar
                )
              }
            ></BsChatRightDots>
            <BsThreeDotsVertical
              className="cursor-pointer hover:text-rose-600"
              size={24}
            ></BsThreeDotsVertical>
            <GoSignOut
              className="cursor-pointer hover:text-rose-600"
              size={24}
              onClick={handleLogout}
            ></GoSignOut>
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-2">
          <h1>Whatsapp Clone</h1>
        </div>
      )}
    </div>
  );
};

export default LeftHeader;
