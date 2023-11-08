const pannekoek = {
  toppings: ['poedersuiker', 'stroop', 'jam'],
  bodems: ['volkoren', 'glutenvrij', 'witmeel'],
};

// ---------------------------------------------------

for (const topping of [...pannekoek.toppings, ...pannekoek.bodems]) {
  console.log(topping);
}

function* myGenerator() {
  yield 'a';
  yield 'b';
  yield 'c';
}

const x = myGenerator();

// 1 voor 1 de values ophalen
console.log(x.next());
console.log(x.next());
console.log(x.next());
console.log(x.next());

// in een for-of loop
for (const value of myGenerator()) {
  console.log(value);
}

// spreading
console.log([...myGenerator()]);
console.log(...myGenerator());
