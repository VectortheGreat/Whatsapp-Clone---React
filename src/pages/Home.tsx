import { useState } from "react";
import LeftHeader from "../components/Left Bar/LeftHeader";
import Messages from "../components/Left Bar/Messages/MessageInbox";
import SearchInput from "../components/Left Bar/SearchInput";
import Chat from "../components/Right Bar/Chat/Chat";
import ChatInput from "../components/Right Bar/Chat/ChatInput";
import NoChat from "../components/Right Bar/Chat/NoChat";
import RightHeader from "../components/Right Bar/RightHeader";
import Users from "../components/Left Bar/Users/Users";
import Login from "../components/Right Bar/Auth/Login";
import { initializeApp } from "firebase/app";
import { config } from "../config/config";
import { getAuth } from "firebase/auth";

const Home = () => {
  const [chatMode, setchatMode] = useState<boolean>(false);
  const [loginMode, setloginMode] = useState<boolean>(true);

  const app = initializeApp(config.firebaseConfig);
  const auth = getAuth(app);
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
            <Login auth={auth}></Login>
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
