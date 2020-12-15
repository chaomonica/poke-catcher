const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3004;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./dist'));
app.use(cors());

app.get('/', (req, res) => {
  res.send("yo trainer!")
})
// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

// UNCOMMENT FOR BACKBONE
// app.use(express.static(__dirname + '/../backbone-client'));
// app.use(express.static(__dirname + '/../node_modules'));


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
