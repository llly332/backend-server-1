const express = require("express");
const Replicate = require("replicate");

const app = express();
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

app.get("/test", async (req, res) => {
  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: "3D futuristic sword"
        }
      }
    );

    res.json(output);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
