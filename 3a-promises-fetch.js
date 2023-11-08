fetch('https://randomuser.me/api?results=3')
  .then((resp) => resp.json())
  .then((data) => console.log(data.results[2].gender))
  .catch((err) => console.error(err));

(async function () {
  try {
    const resp = await fetch('https://randomuser.me/api?results=3');
    const data = await resp.json();
    console.log(data.results[2].gender);
  } catch (err) {
    console.error(err);
  }
})();
