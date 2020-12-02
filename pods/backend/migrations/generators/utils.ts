export function pick<T>(list: T[]) {
  var index = Math.floor(Math.random() * list.length);

  return list[index];
}

export function random(from: number, to: number, fixed: number = 9) {
  return +(from + Math.random() * Math.abs(from - to)).toFixed(fixed);
}

export function times<T>(count: number, fn: (index: number) => T) {
  return Array(count).fill(0).map((_, index) => fn(index));
}

export function randomDate(from: Date, interval: number) {
  const fromMs = from.getTime();
  const newDateMs = Math.floor(random(fromMs, fromMs + interval));
  return new Date(newDateMs);
}
