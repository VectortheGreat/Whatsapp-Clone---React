type StatusSettingsProps = {
  onchangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataUpdate: {
    status?: string | undefined;
  };
};

const StatusSettings: React.FC<StatusSettingsProps> = ({
  onchangeFunc,
  dataUpdate,
}) => {
  return (
    <div className="flex items-center space-x-2 ">
      <label className="w-full">Status:</label>
      <input
        type="text"
        className="border-black border-2 rounded-lg"
        onChange={(e) => onchangeFunc(e)}
        id="status"
        name="status"
        value={dataUpdate.status}
      />
    </div>
  );
};

export default StatusSettings;
