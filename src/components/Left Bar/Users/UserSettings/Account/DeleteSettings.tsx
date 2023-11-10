type DeleteSettingsProps = {
  deleteChecked: boolean;
  handleDeleteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DeleteSettings: React.FC<DeleteSettingsProps> = ({
  deleteChecked,
  handleDeleteChange,
}) => {
  return (
    <div className="flex items-center space-x-1">
      <label
        htmlFor="deleteAccount"
        className="hover:text-rose-800 cursor-pointer"
      >
        Delete:
      </label>
      <input
        type="checkbox"
        id="deleteAccount"
        checked={deleteChecked}
        className="hover:text-rose-800 cursor-pointer"
        onChange={handleDeleteChange}
      />
    </div>
  );
};

export default DeleteSettings;
