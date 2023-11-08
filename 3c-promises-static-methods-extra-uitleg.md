# Static methods and sequential

## Voorbereiding

1. Hier worden `Promise.resolve()` en `Promise.reject()` alvast gebruikt:

   ```js
   const p1 = new Promise((resolve, reject) => {
     setTimeout(() => resolve(100), 300);
   });

   const p2 = Promise.resolve(50);
   //const p2 = Promise.reject('cijfer niet gevonden!');

   const p3 = 25; // wordt straks verpromised
   ```

## 1. all

Retourneer alle waardes in een array, tenzij er één of meer promises gereject werden,  
retourneer dan de *reason van de eerst gerejecte promise*

```js
Promise.all([p1, p2, p3])
  .then((values) => console.log(values))
  .catch((err) => console.error(err));
```

## 2. race

Retourneer waarde van de eerst geresolvde promise, tenzij eerste promise gereject werd,  
retourneer dan de *reason van de eerst gerejecte promise*

```js
Promise.race([p1, p2, p3])
  .then((values) => console.log(values))
  .catch((err) => console.error(err));
```

## 3. allSettled (2020)

Retourneer een array met objecten, elk object is 'fullfilled' of 'rejected':  
`{ status: 'fullfilled', value: ... }` of `{ status: 'rejected', reason: ... }`

```js
Promise.allSettled([p1, p2, p3])
  .then((values) => console.log(values));
```

## 4. any (2021)

Retourneer waarde van de eerst geresolvde promise, tenzijálle promises gereject werden,  
retourneer dan een speciale (nieuwe) AggregateError met daarin een errors property met een array met reasons

```js
Promise.any([p1, p2, p3])
  .then((values) => console.log(values))
  .catch((err) => console.error(err.errors));
```

---

## Promises Sequentieel

`Promise.all()` doet z'n werk parallel.  
Om promises **sequentieel** afwerken zou je een promise _ketting_ moeten bouwen:

```js
p1.then((result) => {
  console.log(result);
  return p2;
})
  .then((result) => {
    console.log(result);
    return p3;
  })
  .then((result) => {
    console.log(result);
  });
```

Hoe kunnen we dit dynamisch aanvliegen ipv hard-coded?  
Input is bijvoorbeeld: `[p1, p2, p3]`

**Manier 1: `Array.reduce()`**

```js
[p1, p2, p3].reduce(
  (promiseChain, currentPromise) => {
    /* 2. main logica */
  } /* 1. start van de ketting */
);
```

Omdat we straks willen '`then`-nen', wordt de eerst schakel van de ketting een al geresolvde promise.

```js
[p1, p2, p3].reduce((promiseChain, currentPromise) => {
  /* 2. main logica */
}, Promise.resolve()); // start ketting met geresolvede promise
```

Main logica:

```js
[p1, p2, p3].reduce((promiseChain, currentPromise) => {
  return promiseChain // return reeds gebouwde ketting
    .then(() => currentPromise) // met daaraan een nieuwe schakel
    .then((value) => console.log(value)); // toon de geresolvde value van deze schakel
}, Promise.resolve());
```

**Manier 2: `async/await`**

(véél eenvoudiger)

```js
(async () => {
  for (const prom of [p1, p2, p3]) {
    const value = await prom;
    console.log(value);
  }
})();
```

Bovenstaand is de enige manier. Array methodes zoals `forEach` gaan er onder water anders mee om.  
Het volgende lukt bijv. niet:

```js
[p1, p2, p3].forEach(async (prom) => console.log(await prom));     // ☹ kan niet
```