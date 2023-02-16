export const getInitials = (name) => {
  const nameArray = name.split(' '); // split name by space to get all sub names;
  const initialsArray = nameArray.map(subName => subName.charAt(0).toUpperCase());
  return initialsArray.join('');
};
