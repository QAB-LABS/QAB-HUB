const mongoose = require('mongoose')

const uri = process.env.MONGODB_LOCAL || process.env.MONGODB_URI || `mongodb://localhost/please-set-process-env-mongodb-uri`

module.export = mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        reconnectTries: 10,
        reconnectInterval: 1500,
        connectTimeoutMS: 3000,
        socketTimeoutMS: 8000,
        keepAlive: true,
    })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
        return x
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    })

mongoose.connection.on('connected', function() {
    console.log(`Mongoose default connection is open to ${uri}`);
});

mongoose.connection.on('error', function(err) {
    console.log(`Mongoose default connection has occurred ${err} error`);
});

mongoose.connection.on('disconnected', function() {
    console.log(`Mongoose default connection is disconnected from ${uri}`);
});

mongoose.connection.on("reconnected", err => {
    console.log(`MongoDB reconnection success @ ${uri}`, err);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log(`Mongoose default connection to ${uri} is disconnected due to application termination`);
        process.exit(0)
    });
});
