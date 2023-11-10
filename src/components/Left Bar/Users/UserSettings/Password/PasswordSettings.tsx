type PasswordSettingsProps = {
  onchangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataUpdate: {
    password?: string;
  };
};
const PasswordSettings: React.FC<PasswordSettingsProps> = ({
  onchangeFunc,
  dataUpdate,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="w-full">Password:</label>
      <input
        type="password"
        className=" rounded-lg"
        onChange={(e) => onchangeFunc(e)}
        id="password"
        name="password"
        value={dataUpdate.password}
        disabled
      />
    </div>
  );
};

export default PasswordSettings;
