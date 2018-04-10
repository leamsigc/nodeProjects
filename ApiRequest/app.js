const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/posts';

// axios
//   .get(url)
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

axios
  .get(url)
  .then(res => {
    console.log(typeof res);
    console.log(res.data);
  });
