export const getTrustpilotStarStatus = (trustScore: number) => {
  if (trustScore >= 1 && trustScore <= 1.2) return { full: 1, half: false };
  if (trustScore >= 1.3 && trustScore <= 1.7) return { full: 1, half: true };
  if (trustScore >= 1.8 && trustScore <= 2.2) return { full: 2, half: false };
  if (trustScore >= 2.3 && trustScore <= 2.7) return { full: 2, half: true };
  if (trustScore >= 2.8 && trustScore <= 3.2) return { full: 3, half: false };
  if (trustScore >= 3.3 && trustScore <= 3.7) return { full: 3, half: true };
  if (trustScore >= 3.8 && trustScore <= 4.2) return { full: 4, half: false };
  if (trustScore >= 4.3 && trustScore <= 4.7) return { full: 4, half: true };
  if (trustScore >= 4.8 && trustScore <= 5) return { full: 5, half: false };
  return { full: 0, half: false };
};
