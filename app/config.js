'use strict';

/**
 * Config
 */
module.exports = {
    name: 'GetStream.io - React Example App',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'DEVELOPMENT',
    mapbox: {
        accessToken: process.env.MAPBOX_ACCESS_TOKEN,
    },
    stream: {
        appId: process.env.STREAM_APP_ID,
        key: process.env.STREAM_KEY,
    },
    api: {
        baseUrl: '/',
    },
    imgix: {
        baseUrl: process.env.IMGIX_BASE_URL,
    },
    algolia: {
        appId: process.env.ALGOLIASEARCH_APPLICATION_ID,
        searchOnlyKey: process.env.ALGOLIASEARCH_API_KEY_SEARCH,
    },
    keen: {
        projectId: process.env.KEEN_PROJECT_ID,
        writeKey: process.env.KEEN_WRITE_KEY,
        readKey: process.env.KEEN_READ_KEY,
    }
};
