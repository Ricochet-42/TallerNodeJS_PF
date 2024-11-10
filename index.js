const express = require('express');
const morgan = require('morgan');

const app = express();
const usuarios = require('./routes/usuarios');
const index = require('./middleware/index');
const auth = require('./middleware/auth');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);
app.use("/usuarios", usuarios)
app.use(auth);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});
