import fs from 'fs';

// fs.readFile('./jan_en_jurre.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.error(`something went wrong: ${err}!`);
//   } else {
//     console.log(data);
//   }
// });

// Callback hell / Pyramid of Doom
// fs.readFile('./jan_en_jurre.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.error(`something went wrong: ${err}!`);
//   } else {
//     console.log(data);
//     fs.readFile('./jan_en_jurre.txt', 'utf-8', (err, data) => {
//       if (err) {
//         console.error(`something went wrong: ${err}!`);
//       } else {
//         console.log(data);
//         fs.readFile('./jan_en_jurre.txt', 'utf-8', (err, data) => {
//           if (err) {
//             console.error(`something went wrong: ${err}!`);
//           } else {
//             console.log(data);
//           }
//         });
//       }
//     });
//   }
// });

// // Dit kan niet, want hij gaat meteen af ...
// const SuperReader = new Promise((resolve, reject) => {
//   fs.readFile('./jan_en_jurre.txt', 'utf-8', (err, data) => {
//     if (err) {
//       reject(`something went wrong: ${err}!`);
//     } else {
//       resolve(data);
//     }
//   });
// });

// SuperReader
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

// Maak er dus een functie van die je wél kunt hergebruiken
const SuperReader = (fileName = './jan_en_jurre.txt') => 
  new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        reject(`something went wrong: ${err}!`);
      } else {
        resolve(data);
      }
    });
  });

SuperReader()
  .then(data => console.log(data))
  .catch(err => console.error(err));