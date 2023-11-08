const primes = {
  _primes: [], // store ALL primes, also the ones from previous rounds
  _current: 0,
  isPrime(value) {
    if (value < 2) return false; // negative, 0 or 1? no prime!
    if (value === 2) return true;

    let sqrt = Math.sqrt(value);
    let prime = true;
    let i = 0;

    // Divise current value through all found primes thusfar,
    // but don't go further than the sqrt of current value
    while (this._primes[i] <= sqrt) {
      if (value % this._primes[i] === 0) {
        prime = false;
        break;
      }
      i++;
    }
    return prime;
  },
  *primeLoop() {
    while (true) {
      this._current += 1;

      if (this.isPrime(this._current)) {
        yield this._current;
      }
    }
  },
  get(numberOfPrimes = 1) {
    for (let i = 0; i < numberOfPrimes; i++) {
      this._primes.push(this.primeLoop().next().value);
    }
    return this._primes.slice(-numberOfPrimes).join(" "); // if not slicing we would return the full array
  },
};

// Event listener for messages coming from main thread
onmessage = (event) => {
  let result = primes.get(event.data); // Retrieve the array of stored primes
  this.postMessage(result); // Post message to main thread
};
