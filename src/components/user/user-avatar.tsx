import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

type UserAvatarProps = {
  image?: string | null;
  name?: string | null;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
};

export function UserAvatar({
  image,
  name,
  className,
  size = 'default',
}: UserAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      <AvatarImage
        src={image ?? ""}
        alt={name ?? 'User'}
      />

      <AvatarFallback>
        {name}
      </AvatarFallback>
    </Avatar>
  );
}