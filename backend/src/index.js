import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import { app } from "./app.js";
import { connectDB } from "./DB/index.js";

console.log("Loaded env secret:", process.env.ACCESS_TOKEN_SECRET);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server is listening, just like she used to once on port : ${
          process.env.PORT || 3000
        }`
      );
    });
  })
  .catch((error) => {
    console.log(
      "Server failed to listen, just like she did later,Try again, maybe she'll respond",
      error
    );
  });
