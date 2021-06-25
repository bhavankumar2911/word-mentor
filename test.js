arr = [
  { id: 1, name: "bhavan" },
  { id: 2, name: "kural" },
  { id: 3, name: "aakash" },
];

console.log(
  arr.map((i) => {
    if (i.id == 2) return { id: 2, name: "changed" };
    return i;
  })
);
