function sumNumbers(inputs) {
  let check = (el) => (isNaN(el) ? 0 : el);
  let value = inputs.reduce((accumulator, current) => {
    console.log("acc = ", check(accumulator), "current = ", check(current));
    let a = Number(check(accumulator) + check(current));
    return a;
  });

  return value;
}

console.log(sumNumbers([{}, 1, [], 2, "hi", 0, 6]));
