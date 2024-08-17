require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;
const multer  = require('multer')
const upload = multer({ dest: './photo' })

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/api/auth', require('./routes/api/user'));
app.use('/api/contacts', require('./routes/api/contacts'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


















// const express = require('express');
// const app = express();
// const path = require('path');
// const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
// const { logger } = require('./middleware/logEvents');
// const errorHandler = require('./middleware/errorHandler');
// const PORT = process.env.PORT || 3500;

// app.use(logger);
// app.use(cors(corsOptions));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use('/', express.static(path.join(__dirname, '/public')));

// // routes
// app.use('/api/auth', require('./routes/api/user'));
// app.use('/api/employees', require('./routes/api/employees'));
// app.use('/api/contacts', require('./routes/api/contacts'));

// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });

// app.use(errorHandler);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));