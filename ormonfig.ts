module.exports =
    {
        "type": "postgres",
        "host": process.env.NODE_ENV === "test" ? process.env.TEST_DB_HOST : process.env.TYPEORM_HOST,
        "port": process.env.NODE_ENV === "test" ? process.env.TEST_DB_PORT : process.env.TYPEORM_PORT,
        "username": process.env.NODE_ENV === "test" ? process.env.TEST_DB_USERNAME : process.env.TYPEORM_USERNAME,
        "password": process.env.NODE_ENV === "test" ? process.env.TEST_DB_PASSWORD : process.env.TYPEORM_PASSWORD,
        "database": process.env.NODE_ENV === "test" ? process.env.TEST_DB_NAME : process.env.TYPEORM_DATABASE,
        "synchronize": true,
        "logging": false,
        "dropSchema": process.env.NODE_ENV === "test" ? true : false,
        "entities": [
            __dirname + "/src/entities/**/*.{js,ts}"
        ],
        "migrations": [
            __dirname + "/src/migrations/**/*{.ts,.js}"
        ],
        "subscribers": [
            __dirname + "/src/subscriber/*.ts"
        ],
        "cli": {
            "entitiesDir": __dirname + "/src/db/entities",
            "migrationsDir": __dirname + "/src/db/migrations",
            "subscribersDir": __dirname + "/src/db/subscriber"
        }
    }

