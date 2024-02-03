import Redis from 'ioredis'
let redis_client = new Redis(process.env.NEXT_PUBLIC_UPSTASH_IOREDIS);
export default redis_client