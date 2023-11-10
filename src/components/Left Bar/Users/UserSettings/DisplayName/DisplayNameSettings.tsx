type DisplayNameSettingsProps = {
  onchangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataUpdate: {
    name?: string;
  };
};

const DisplayNameSettings: React.FC<DisplayNameSettingsProps> = ({
  onchangeFunc,
  dataUpdate,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="w-full">Name:</label>
      <input
        type="text"
        className="border-black border-2 rounded-lg"
        onChange={(e) => onchangeFunc(e)}
        id="name"
        name="name"
        value={dataUpdate.name}
      />
    </div>
  );
};

export default DisplayNameSettings;
