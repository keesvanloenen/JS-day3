// podcast: https://syntax.fm/
// aflevering 689 (afgelopen maandag)

// Vroeger enkel Object en Array
const obj = {};
const arr = [];

// Sinds 2015 ook Map en Set
const map = new Map();   // soort Dictionary
const set = new Set();   // soort List

/* Voordelen:
   - soms meer performant
   - geen duplicates
   - key kan van elk data type zijn (bij een object is het altijd een string, symbol of 'number')
     een key mag dus ook een object zijn (handig als je bijv. html elementen wilt bijhouden)
*/

// Methodes en properties zijn (vrij) intuïtief:
const podcast = { id: 1, title: 'JS' };
map.set(podcast, 'https://www.podbean.com/media/share/abcedef');
console.log(map.has(podcast));
console.log(map.get(podcast));
map.delete(podcast);
map.clear();
map.size;

// enne er bestaan ook een WeakMap en WeakSet
let movie1 = { id: 10, title: 'Batman', year: 1989 };
const movies = new WeakSet();
movies.add(movie1);

movie1 = null;  // when the object is not used anymore, it will be removed from the weakset
