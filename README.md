# Setup
- make sure you have nodejs, docker and docker-compose installed
- run `npm install` to install modules
- run `docker-compose up -d` to start the postgres and redis containers (takes a while because dummy data is created)

# Test uncached query
- run `npm start` to start the app
- send HTTP GET to `http://localhost:3000/products`(you should see console output how long the query took)

# Implement Caching
- install [node-redis](https://github.com/redis/node-redis)
- Cache your query in redis
- Test the performance
- Compare your result to the provided solution in the [cached branch](https://github.com/NerdJeremia/cache-me-if-you-can/tree/cached)
