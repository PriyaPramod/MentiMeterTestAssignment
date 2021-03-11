const express = require('express');
const os = require('os');
const axios = require('axios');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/:id', async (req, res) => {
  let output = {};
  let status = 200;
  try {
    const question = await axios.get(`https://api.mentimeter.com/questions/${req.params.id}`);
    const answer = await axios.get(`https://api.mentimeter.com/questions/${req.params.id}/result`);
    //('https://api.mentimeter.com/questions/48d75c359ce4/result');

    output['question'] = question.data.question;
    output['result'] = answer.data.results;
  } catch {
    status = 404;
    output = { message: 'Not found.', status: 404, code: 'not_found' };
  }

  //console.log(result.data);
  return res.status(status).json(output);
});

app.listen(process.env.PORT || 5000, () => console.log(`Listening on port ${process.env.PORT || 5000}!`));
