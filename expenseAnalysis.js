expenses = {
  '2023-01': {
    '01': {
      food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
      fuel: [210.22],
    },
    '09': {
      food: [11.9],
      fuel: [190.22],
    },
  },
  '2023-03': {
    '07': {
      food: [20, 11.9, 30.2, 11.9],
    },
    '04': {
      food: [10.2, 11.5, 2.5],
      fuel: [],
    },
  },
  '2023-04': {},
};

function getFirstSunday(year, month) {
  for (let day = 1; day <= 7; day++) {
    const date = new Date(year, month - 1, day); // in JS month start from 0
    if (date.getDay() === 0) return day; // 0 — Sunday
  }
  return null;
}

function solution1(data) {
  const startTime = performance.now(); //  time the function starts executing.
  let values = [];

  for (const [yearMonth, days] of Object.entries(data)) {
    const [year, month] = yearMonth.split('-').map(Number);
    const firstSunday = getFirstSunday(year, month);

    Object.entries(days).forEach(([dayStr, categories]) => {
      if (parseInt(dayStr) <= firstSunday) {
        Object.values(categories).forEach(arr => values.push(...arr));
      }
    });
  }

  const average = values.length ? values.reduce((sum, val) => sum + val, 0) / values.length : null;
  const finalTime = performance.now();
  console.log(`solution1: ${(startTime - finalTime).toFixed(2)}ms`);
  return average;
}

function quickSelect(arr, key) {
  if (arr.length <= 1) return arr[0];

  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const lows = arr.filter(el => el < pivot);
  const highs = arr.filter(el => el > pivot);
  const pivots = arr.filter(el => el === pivot);

  if (key < lows.length) return quickSelect(lows, key);
  else if (key < lows.length + pivots.length) return pivot;
  else return quickSelect(highs, key - lows.length - pivots.length);
}

function solution2(data) {
  const startTime = performance.now();
  let values = [];

  for (const [yearMonth, days] of Object.entries(data)) {
    const [year, month] = yearMonth.split('-').map(Number);
    const firstSunday = getFirstSunday(year, month);

    for (const [dayStr, categories] of Object.entries(days)) {
      const day = parseInt(dayStr);
      if (day <= firstSunday) {
        for (const arr of Object.values(categories)) {
          values.push(...arr);
        }
      }
    }
  }

  let avg = null;
  if (values.length) {
    avg = values.reduce((a, b) => a + b, 0) / values.length;
  }

  const endTime = performance.now();
  console.log(`solution2: ${(endTime - startTime).toFixed(2)}ms`);
  return avg;
}

console.log('Avg1:', solution1(expenses));
console.log('Avg2:', solution2(expenses));
