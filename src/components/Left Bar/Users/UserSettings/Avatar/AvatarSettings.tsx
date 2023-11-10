import { images } from "../../../../../utils/images";

type AvatarSettingsProps = {
  selectedImageIndex: number;
  handleImageClick: (index: number) => void;
};

const AvatarSettings: React.FC<AvatarSettingsProps> = ({
  selectedImageIndex,
  handleImageClick,
}) => {
  return (
    <div className="mt-3 space-y-3">
      <h1 className="text-center font-bold border-b-2 border-black">
        Change Avatar
      </h1>
      <div className="grid grid-cols-6 space-x-2">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt="img"
            className={`h-20 rounded-full cursor-pointer mxx-auto p-1 ${
              selectedImageIndex === index
                ? "border-4 border-red-900 transform hover:scale-110 transition-transform duration-500"
                : ""
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarSettings;
