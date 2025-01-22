export function compareNFCSafe(a: string, b: string): boolean {
  return a.normalize('NFC') === b.normalize('NFC');
}

export function calculateCorrectRatio(
  correctCount: number,
  incorrectCount: number,
) {
  const totalAttempts = correctCount + incorrectCount;
  return totalAttempts > 0
    ? Math.round((correctCount / totalAttempts) * 100)
    : 0;
}

export const ratioCondition = (correctRatios: string[]) => {
  const conditions = correctRatios
    .map((ratio) => {
      switch (ratio) {
        case 'High':
          return `
          (word.correctCount / NULLIF((word.correctCount + word.incorrectCount), 0) <= 1.0 
           AND word.correctCount / NULLIF((word.correctCount + word.incorrectCount), 0) >= 0.8)
        `;
        case 'Mid':
          return `
          (word.correctCount / NULLIF((word.correctCount + word.incorrectCount), 0) < 0.8 
           AND word.correctCount / NULLIF((word.correctCount + word.incorrectCount), 0) >= 0.5)
        `;
        case 'Low':
          return `
          (COALESCE(word.correctCount / NULLIF((word.correctCount + word.incorrectCount), 0), 0) < 0.5 
           AND COALESCE(word.correctCount / NULLIF((word.correctCount + word.incorrectCount), 0), 0) >= 0.0)
        `;
        default:
          return null;
      }
    })
    .filter(Boolean); // Null 조건 제거

  // 조건을 OR로 연결
  return conditions.length > 0 ? `(${conditions.join(' OR ')})` : null;
};
