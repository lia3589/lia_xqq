import * as axios from 'axios';

const client = axios.default;

client.get('http://127.0.0.1:7001').then ((response) => {
  console.log(response);
}).catch ((error) => {
  console.log(error);
});