'use strict';

// Zijn primitives immutable: ja!
let value = '12appel';
let result = parseInt(value);
console.log(value, result);

// Objecten zijn dat niet:
const user = { id: 10, naam: 'Joop' };
user.naam = 'Mo';

// Met na een freeze wel:
const user2 = Object.freeze({ id: 10, naam: 'Joop' });
// user2.naam = 'Mo';   // foutmelding alleen met 'use strict'!!
console.log(Object.values(user2));

const passenger = Object.freeze({
  id: 10,
  naam: 'Joop',
  address: { street: 'abcstreet', nr: 116 }, // 👈 wél mutable
});

//passenger.address = { ietsanders: true };   // dit kan dan niet
passenger.address.nr += 100; // dit wel

console.log(JSON.stringify(passenger));

let kleuren = ['rood', 'geel', 'blauw'];
const kleurenMetUitroepTeken = kleuren.map((k) => k + '!');
console.log(kleurenMetUitroepTeken);

console.log(kleuren.filter((elem) => elem.includes('l')));

// Opdracht: schrijf je eigen jurreFilter() die begint met Array.prototype =

Array.prototype.keesFilter = function (predicate) {
  // of callbackfn
  const result = [];

  for (const elem of this) {
    if (predicate(elem)) result.push(elem);
  }

  return result;
};

console.log(kleuren.keesFilter((elem) => elem.includes('l')));

// Opdracht: voeg een element toe aan het array en zorg dat de referentie wijzigt (gebruik destructuring)

kleuren = [...kleuren, 'lila'];
console.log(kleuren);

console.log([1, 2, 3].filter((_value, index) => index != 1));

const kopiePassenger = { ...passenger, id: 11 };
console.log(kopiePassenger);
