const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {MONGO_DB_CONFIG} = require('./config/app.config');
const swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./swagger.json');

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log('Database connection error: ', err);
});

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', require('./routes/app.routes'));
app.use("/uploads", express.static('uploads'));
//app.use(errors.erroHandler);

app.listen(process.env.port || 3000, function(){
    console.log('Server started');
});