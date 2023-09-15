export function findClosestDate(arr: Date[], target: Date): number | null {
  if (arr.length === 0) return null;

  let left = 0;
  let right = arr.length - 1;
  let closestIndex: number | null = null;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentDate = arr[mid];

    if (currentDate.getTime() === target.getTime()) {
      return mid; // Found an exact match, return its index.
    }

    if (
      !closestIndex ||
      Math.abs(currentDate.getTime() - target.getTime()) <
        Math.abs(arr[closestIndex].getTime() - target.getTime())
    ) {
      closestIndex = mid;
    }

    if (currentDate < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return closestIndex;
}
