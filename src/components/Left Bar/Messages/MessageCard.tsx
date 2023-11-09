type MessageCardProps = {
  id: string;
  name: string;
};

const MessageCard: React.FC<MessageCardProps> = () => {
  // const dispatch = useDispatch();
  // const loggedUser = useSelector(
  //   (state: UserSliceStateSelector) => state.userStore.loggedUser
  // ) || { uid: "", displayName: "", photoURL: "" };

  // const [chatID, setChatID] = useState<string>("");
  // useEffect(() => {
  //   // console.log(chatID);
  // }, [chatID]);

  return (
    <div>
      <div
        className="flex p-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
        // onClick={cardSubmit}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold">Name</p>
          <p className="text-xs text-gray-500">Message</p>
        </div>
        <div className="ml-auto text-xs text-gray-500">Date</div>
      </div>
    </div>
  );
};

export default MessageCard;
