import { useEffect, useState } from "react";
import LeftHeader from "../components/Left Bar/LeftHeader";
import Messages from "../components/Left Bar/Messages/MessageInbox";
import SearchInput from "../components/Left Bar/SearchInput";
import Chat from "../components/Right Bar/Chat/Chat";
import ChatInput from "../components/Right Bar/Chat/ChatInput";
import NoChat from "../components/Right Bar/Chat/NoChat";
import RightHeader from "../components/Right Bar/RightHeader";
import Users from "../components/Left Bar/Users/Users";
import Login from "../components/Right Bar/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { authInfo } from "../redux/userSlice";
import { loginModeStateSelector, tokenStateSelector } from "../types/AuthTypes";
import { authFBConfig } from "../config/config";

const Home = () => {
  const dispatch = useDispatch();
  const [chatMode] = useState<boolean>(false);
  const loginMode = useSelector(
    (state: loginModeStateSelector) => state.userStore.loginMode
  );
  const token = useSelector(
    (state: tokenStateSelector) => state.userStore.token
  );
  const auth = authFBConfig;

  const authInfoPayload = {
    app: {
      name: auth.app.name,
    },
    // currentUser: auth.currentUser,
  };
  useEffect(() => {
    // Move the dispatch call to a useEffect
    dispatch(authInfo(authInfoPayload));
  }, []);

  return (
    <div>
      <header className="grid grid-cols-12">
        <LeftHeader></LeftHeader>
        {chatMode && <RightHeader></RightHeader>}
      </header>
      <section className="grid grid-cols-12">
        <div className="col-span-4">
          <SearchInput></SearchInput>
          {chatMode ? (
            <>
              <Messages></Messages>
            </>
          ) : (
            <Users></Users>
          )}
        </div>
        <div className="col-span-8">
          {loginMode ? (
            <Login auth={auth} loginMode={loginMode} token={token}></Login>
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
