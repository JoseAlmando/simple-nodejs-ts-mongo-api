export default {
  jwtTokenSrecreet: process.env.SECRET_TOKEN || "secrecttoken",
  DB: {
    URL: process.env.MONGO_URL  || "mongodb://localhost/test",
  }
};
