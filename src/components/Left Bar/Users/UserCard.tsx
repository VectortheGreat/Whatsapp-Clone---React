const UserCard = ({ name }) => {
  return (
    <div>
      <div className="flex p-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-500">Status</p>
        </div>
        <div className="ml-auto text-xs text-gray-500">Date</div>
      </div>
    </div>
  );
};

export default UserCard;
