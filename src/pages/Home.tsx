import { useEffect, useState } from "react";
import LeftHeader from "../components/Left Bar/LeftHeader";
import MessageInbox from "../components/Left Bar/Messages/MessageInbox";
import SearchInput from "../components/Left Bar/SearchInput";
import Chat from "../components/Right Bar/Chat/Chat";
import ChatInput from "../components/Right Bar/Chat/ChatInput";
import NoChat from "../components/Right Bar/Chat/NoChat";
import RightHeader from "../components/Right Bar/RightHeader";
import Users from "../components/Left Bar/Users/Users";
import Login from "../components/Right Bar/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { authInfo } from "../redux/userSlice";
import {
  loginModeStateSelector,
  toggleLoginOrSignupStateSelector,
  tokenStateSelector,
} from "../types/UserTypes";
import { authFBConfig } from "../config/config";
import Signup from "../components/Right Bar/Auth/Signup";

const Home = () => {
  const dispatch = useDispatch();
  const [chatMode, setChatMode] = useState<boolean>(true);
  const loginMode = useSelector(
    (state: loginModeStateSelector) => state.userStore.loginMode
  );
  const toggleLoginOrSignup = useSelector(
    (state: toggleLoginOrSignupStateSelector) =>
      state.userStore.toggleLoginOrSignup
  );
  const token = useSelector(
    (state: tokenStateSelector) => state.userStore.token
  );
  const auth = authFBConfig;

  const authInfoPayload = {
    app: {
      name: auth.app.name,
    },
    currentUser: auth.currentUser,
  };
  useEffect(() => {
    dispatch(authInfo(authInfoPayload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header className="grid grid-cols-12">
        <LeftHeader setChatMode={setChatMode}></LeftHeader>
        {chatMode && token && <RightHeader></RightHeader>}
      </header>
      <section className="grid grid-cols-12">
        <div className="col-span-4">
          <SearchInput></SearchInput>
          {chatMode ? (
            <>
              <MessageInbox></MessageInbox>
            </>
          ) : (
            <Users></Users>
          )}
        </div>
        <div className="col-span-8">
          {loginMode ? (
            toggleLoginOrSignup ? (
              <Login auth={auth} loginMode={loginMode} token={token}></Login>
            ) : (
              <Signup></Signup>
            )
          ) : chatMode ? (
            <>
              <Chat></Chat>
              <ChatInput></ChatInput>
            </>
          ) : (
            <NoChat></NoChat>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
