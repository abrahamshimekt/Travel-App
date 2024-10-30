"use client";
import Image from "next/image";

interface AvatarProps {
  username: string;
  imageSrc?: string;
  handleOnClick?: () => void;
}

const Avatar = ({ username, imageSrc, handleOnClick }: AvatarProps) => {
  return (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={handleOnClick}
      title={username}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${username}'s profile picture`}
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-500">
            {username[0]?.toUpperCase()}
          </div>
        )}
      </div>
      <span className="regular-16 text-gray-800 whitespace-nowrap">{username}</span>
    </div>
  );
};

export default Avatar;
