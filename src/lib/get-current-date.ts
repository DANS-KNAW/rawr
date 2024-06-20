const getCurrentDate = (stamp: boolean = true) => {
  const date = new Date();
  if (!stamp) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  return date.getTime().toString();
};
export default getCurrentDate