import express from "express";
const app = express();

app.get("/ads", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Ad 1",
    },
    {
      id: 2,
      title: "Ad 2",
    },
    {
      id: 3,
      title: "Ad 3",
    },
  ]);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
