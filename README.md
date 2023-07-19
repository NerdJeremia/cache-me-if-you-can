# Setup
- make sure you have nodejs, docker and docker-compose installed
- clone repo
- run `npm install` to install modules
- start docker
- run `docker-compose up -d` to start the postgres and redis containers (it takes a while for the dummy data to be created)

# Test uncached query
- run `npm start` to start the app
- send HTTP GET to `http://localhost:3000/products`(you should see console output how long the query took)

# Implement Caching
- install [node-redis](https://github.com/redis/node-redis)
- Cache your query in redis
- Test the performance
- Compare your result to the provided solution in the [cached branch](https://github.com/NerdJeremia/cache-me-if-you-can/tree/cached)
