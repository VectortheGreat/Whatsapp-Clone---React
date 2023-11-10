type EmailSettingsProps = {
  onchangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataUpdate: {
    email?: string;
  };
};

const EmailSettings: React.FC<EmailSettingsProps> = ({
  onchangeFunc,
  dataUpdate,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="w-full">Email:</label>
      <input
        type="email"
        className=" rounded-lg"
        onChange={(e) => onchangeFunc(e)}
        id="email"
        name="email"
        value={dataUpdate.email}
        disabled
      />
    </div>
  );
};

export default EmailSettings;
