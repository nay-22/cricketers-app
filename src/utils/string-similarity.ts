const jaccardSimilarity = (a: string, b: string): number => {
  const setA = new Set(a.split(""));
  const setB = new Set(b.split(""));

  const intersection = [...setA].filter((it) => setB.has(it));
  const union = new Set([...setA, ...setB]);

  return intersection.length / union.size;
};

const diceCoefficient = (a: string, b: string): number => {
  const setA = new Set(a.split(""));
  const setB = new Set(b.split(""));

  const intersection = [...setA].filter((it) => setB.has(it));

  return (2 * intersection.length) / (setA.size + setB.size);
};

const computeSimilarityIndex = (
  a: string,
  b: string,
  options?: { use: "jaccard-similarity" | "dice-coefficient" }
) => {
  switch (options?.use) {
    case "dice-coefficient":
      return diceCoefficient(a, b);
    case "jaccard-similarity":
      return jaccardSimilarity(a, b);
    default:
      return jaccardSimilarity(a, b);
  }
};

export default computeSimilarityIndex;
