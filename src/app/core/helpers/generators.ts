export function generateId(): number {
  const id = [];

  for (let i = 0; i < 9; i++) {
    id.push(Math.round(Math.random() * (9)));
  }

  if (id[0] === 0) {
    id[0] = Math.round(Math.random() * (9 - 1) + 1);
  }

  return parseInt(id.join(''), 10);
}
