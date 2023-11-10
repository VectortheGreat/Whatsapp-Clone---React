type PhoneSettingsProps = {
  onchangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataUpdate: {
    phone?: string;
  };
};

const PhoneSettings: React.FC<PhoneSettingsProps> = ({
  onchangeFunc,
  dataUpdate,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="w-full">Phone:</label>
      <input
        type="text"
        className=" rounded-lg"
        onChange={(e) => onchangeFunc(e)}
        id="phone"
        name="phone"
        value={dataUpdate.phone}
        disabled
      />
    </div>
  );
};

export default PhoneSettings;
