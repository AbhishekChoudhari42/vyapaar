// import { Redis } from '@upstash/redis'

// const redis_client = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// })

// export default redis_client
// const Redis = require("ioredis");


import Redis from 'ioredis'

let redis_client = new Redis(process.env.NEXT_PUBLIC_UPSTASH_IOREDIS);

export default redis_client