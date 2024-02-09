import Redis from 'ioredis'
const redis_client = () => new Redis(process.env.UPSTASH_IOREDIS);
// const redis_client = new Redis({
//     port: 17404, // Redis port
//     host: "redis-17404.c301.ap-south-1-1.ec2.cloud.redislabs.com", // Redis host
//     // username: "Mudassar", // needs Redis >= 6
//     password: "c4SGIaADzOtQCNuO4sQcBhs16B34pOUi",
//     db: 0, // Defaults to 0
//   });
export default redis_client