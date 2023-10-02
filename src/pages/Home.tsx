import LeftHeader from "../components/Left Bar/LeftHeader";
import Messages from "../components/Left Bar/Messages/MessageInbox";
import SearchInput from "../components/Left Bar/SearchInput";
import Chat from "../components/Right Bar/Chat/Chat";
import ChatInput from "../components/Right Bar/Chat/ChatInput";
import RightHeader from "../components/Right Bar/RightHeader";

const Home = () => {
  return (
    <div>
      <header className="grid grid-cols-12">
        <LeftHeader></LeftHeader>
        <RightHeader></RightHeader>
      </header>
      <section className="grid grid-cols-12">
        <div className="col-span-4">
          <SearchInput></SearchInput>
          <Messages></Messages>
        </div>
        <div className="col-span-8">
          <Chat></Chat>
          <ChatInput></ChatInput>
        </div>
      </section>
    </div>
  );
};

export default Home;
