export const getTrustpilotStarRating = (trustScore: number): string => {
  switch (true) {
    case trustScore >= 1 && trustScore <= 1.2:
      return "onestar.svg";
    case trustScore >= 1.3 && trustScore <= 1.7:
      return "onehalfstar.svg";
    case trustScore >= 1.8 && trustScore <= 2.2:
      return "twostar.svg";
    case trustScore >= 2.3 && trustScore <= 2.7:
      return "twohalfstar.svg";
    case trustScore >= 2.8 && trustScore <= 3.2:
      return "threestar.svg";
    case trustScore >= 3.3 && trustScore <= 3.7:
      return "threehalfstar.svg";
    case trustScore >= 3.8 && trustScore <= 4.2:
      return "fourstar.svg";
    case trustScore >= 4.3 && trustScore <= 4.7:
      return "fourhalfstar.svg";
    case trustScore >= 4.8 && trustScore <= 5:
      return "fivestar.svg";
    default:
      return "";
  }
};
