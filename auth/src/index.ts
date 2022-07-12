import express from 'express';
import {json} from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/current', (req, res) => {
  res.status(200).send({
    id: 1,
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!!!!');
});
