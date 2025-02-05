export const getRandomColor = () => {
  const colors = ["bg-core-blue", "bg-red-300", "bg-yellow-300"];
  const rand = Math.floor(Math.random() * (2 - 1 + 2) + 0);
  return colors[rand];
};

export const getRandomGuide = () => {
  const tags = ["Guide", "Broadband", "Article"];
  const rand = Math.floor(Math.random() * (2 - 1 + 1) + 1);
  return {
    image: {
      src: `../../assets/images/guide-${rand}.svg`,
      alt: `Its guide image ${rand}`,
      width: 471,
      height: 280,
    },
    tags: [{ text: tags[rand], backgroundColor: getRandomColor() }],
    onClick: () => console.log(`you clicked guide with tag ${tags[rand]}`),
  };
};
