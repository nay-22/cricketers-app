const getAge = (dob: number): number => {
  const now = new Date();
  const birthDate = new Date(dob);

  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDifference = now.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && now.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export default getAge;
