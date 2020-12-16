const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

const routes = require('./routes.js');
const app = express();
const PORT = process.env.PORT || 3062;


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./dist'));
// app.use(cors());
app.use('/', routes);

// app.get('/', (req, res) => {
//   res.send("yo trainer!")
// })



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
