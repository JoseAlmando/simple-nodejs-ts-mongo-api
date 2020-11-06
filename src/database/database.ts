import mongoose from "mongoose";

import config from "../config/config";

mongoose.set("useFindAndModify", true);
mongoose
  .connect(config.DB.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => {
    console.log(
      `DB ${db.connections[0].name} is connected in host ${db.connections[0].host}`
    );
  })
  .catch((err) => console.log(err));