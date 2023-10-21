import { signOut } from "firebase/auth";
import { BsChatRightDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { loginModeToggle, tokenInfo } from "../../redux/userSlice";
import { authFBConfig } from "../../config/config";
import { tokenStateSelector } from "../../types/UserTypes";

type LeftHeaderProps = {
  setChatMode: (chatMode: boolean) => void;
};
const LeftHeader: React.FC<LeftHeaderProps> = ({ setChatMode }) => {
  const token = useSelector(
    (state: tokenStateSelector) => state.userStore.token
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
          <img
            src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
            alt=""
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="flex space-x-4">
            <BsChatRightDots
              size={24}
              className="cursor-pointer"
              onClick={() => setChatMode((prevChatMode) => !prevChatMode)}
            ></BsChatRightDots>
            <BsThreeDotsVertical
              className="cursor-pointer"
              size={24}
            ></BsThreeDotsVertical>
            <button onClick={handleLogout}>Sign Out</button>
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
