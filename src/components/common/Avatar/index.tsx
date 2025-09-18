import  MuiAvatar, { type AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name: string) {
  const parts = name.trim().split(" ");

  let initials = "";
  if (parts.length === 0 || !parts[0]) {
    initials = "?";
  } else if (parts.length === 1) {
    initials = parts[0][0].toUpperCase();
  } else {
    initials = `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return {
    style: {
      backgroundColor: stringToColor(name),
    },
    children: initials,
  };
}


type AvatarProps = MuiAvatarProps & {name?:string}

export default function Avatar({name,...props}:AvatarProps) {
  return <MuiAvatar {...(name ? stringAvatar(name) : {})} {...props} />
  
}
