import LeftHeader from "../components/Left Bar/LeftHeader";
import MessageCard from "../components/Left Bar/Messages/MessageCard";
import SearchInput from "../components/Left Bar/SearchInput";
import Chat from "../components/Right Bar/Chat/Chat";
import ChatInput from "../components/Right Bar/Chat/ChatInput";
import RightHeader from "../components/Right Bar/RightHeader";

const Home = () => {
  return (
    <div>
      <header className="flex justify-between">
        <LeftHeader></LeftHeader>
        <RightHeader></RightHeader>
      </header>
      <header className="flex justify-between">
        <div>
          <SearchInput></SearchInput>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
        </div>
        <div>
          <Chat></Chat>
          <ChatInput></ChatInput>
        </div>
      </header>
    </div>
  );
};

export default Home;
