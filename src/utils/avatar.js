class AvatarUtils {
  stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  stringAvatar(name) {
    return {
      sx: {
        bgcolor: this.stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
}

const avatarutils = new AvatarUtils();
export default avatarutils;
