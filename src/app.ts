import "dotenv/config";
import express, { response } from "express";

const app = express();
app.get("/github", (request, resonse) => {
  resonse.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_SECRET_ID}`
  );
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code)
});

app.listen(4000, () => console.log(`🚀🚀Servido rodando`));
