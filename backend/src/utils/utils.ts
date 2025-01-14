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
