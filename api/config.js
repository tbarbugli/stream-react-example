'use strict';

/**
 * Config
 */


if (process.env.CLEARDB_DATABASE_URL) {
    var dbUrlRegEx = /mysql:\/\/([^:]+):([^@]+)@([^/]+)\/([\d\w-]+)/;
    var matches =  dbUrlRegEx.exec(process.env.CLEARDB_DATABASE_URL);
    process.env.DB_USERNAME = matches[1];
    process.env.DB_PASSWORD = matches[2];
    process.env.DB_HOST = matches[3];
    process.env.DB_NAME = matches[4];
    process.env.DB_PORT = 3306;
}

if (process.env.STREAM_URL) {
    var streamUrlRegEx = /https:\/\/([^:]+):([^@]+)@[^/]+\/\?app_id=(\d+)/;
    var matches = streamUrlRegEx.exec(process.env.CLEARDB_DATABASE_URL);
    process.env.STREAM_KEY = matches[1];
    process.env.STREAM_SECRET = matches[2];
    process.env.STREAM_APP_ID = matches[3];
}

module.exports = {
    name: 'GetStream.io - React Example App',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    db: {
         name: process.env.DB_NAME || 'cabin',
         username: process.env.DB_USERNAME,
         password: process.env.DB_PASSWORD,
         host: process.env.DB_HOST,
         port: process.env.DB_PORT,
    },
    mapbox: {
        accessToken: process.env.MAPBOX_ACCESS_TOKEN,
    },
    s3: {
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
    },
    stream: {
        appId: process.env.STREAM_APP_ID,
        key: process.env.STREAM_KEY,
        secret: process.env.STREAM_SECRET,
    },
    algolia: {
        appId: process.env.ALGOLIASEARCH_APPLICATION_ID,
        searchOnlyKey: process.env.ALGOLIASEARCH_API_KEY_SEARCH,
        apiKey: process.env.ALGOLIASEARCH_API_KEY,
    },
    keen: {
        projectId: process.env.KEEN_PROJECT_ID,
        writeKey: process.env.KEEN_WRITE_KEY,
        readKey: process.env.KEEN_READ_KEY,
    },
};
