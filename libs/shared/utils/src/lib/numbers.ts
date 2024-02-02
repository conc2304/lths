export const findClosestNumber = (x: number, numbers: number[], selectHigher = false) => {
  if (numbers.length === 0) {
    throw new Error('The input array must not be empty');
  }

  let closestNumber = numbers[0];
  let minDifference = Math.abs(x - closestNumber);

  for (let i = 1; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const currentDifference = Math.abs(x - currentNumber);

    if (
      currentDifference < minDifference ||
      (selectHigher && currentDifference === minDifference && currentNumber > closestNumber)
    ) {
      closestNumber = currentNumber;
      minDifference = currentDifference;
    }
  }

  return closestNumber;
};
