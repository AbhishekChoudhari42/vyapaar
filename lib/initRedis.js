import Redis from 'ioredis'
const redis_client = () => new Redis(process.env.UPSTASH_IOREDIS);
export default redis_client