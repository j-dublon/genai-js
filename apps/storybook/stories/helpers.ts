export const getRandomGuideImage = () => {
  const rand = Math.floor(Math.random() * (2 - 1 + 1) + 1);
  return `../../assets/images/guide-${rand}.svg`;
};
