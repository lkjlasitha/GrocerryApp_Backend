const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_DB_CONFIG } = require('./config/app.config');
const swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./swagger.json');
const errors = require("./middleware/errors");

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected Successfuly........  🚀');
}).catch(err => {
    console.log('Database connection error: ', err);
});

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', require('./routes/app.routes'));
app.use("/uploads", express.static('uploads'));
app.use(errors.erroHandler);

// Using process.env.PORT or fallback to 4000
const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
    console.log('Server started');
    const localUrl = `http://localhost:${PORT}`; // Using the correct PORT variable
    console.log(`Server is running at ${localUrl} 🚀`);
});
