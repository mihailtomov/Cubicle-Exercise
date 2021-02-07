const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost/cubicle',
        SALT_ROUNDS: 2,
        SECRET: 'mysecret',
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'mongodb+srv://admin:<password>@cubicles-exercise.owbgc.mongodb.net/cubicles?retryWrites=true&w=majority',
        SALT_ROUNDS: 10,
        SECRET: 'mysecret',
    }
}

module.exports = config[process.env.NODE_ENV.trim()];