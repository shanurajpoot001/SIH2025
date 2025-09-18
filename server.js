import express from "express";
const app = express();
app.use(express.json());

// API 1: Train Status (decide order)
app.post("/train-status", (req, res) => {
  const { trains } = req.body;

  // Simple rule: 1) Higher priority first, 2) Earlier arrival next
  trains.sort((a, b) => {
    if (a.priority !== b.priority) return b.priority - a.priority;
    return a.arrival - b.arrival;
  });

  res.json({
    order: trains.map(t => t.name)
  });
});

// API 2: Crossing between 2 trains
app.post("/crossing", (req, res) => {
  const { trainA, trainB } = req.body;

  let result = "";
  if (trainA.priority > trainB.priority) {
    result = `${trainA.name} should go first (higher priority)`;
  } else if (trainB.priority > trainA.priority) {
    result = `${trainB.name} should go first (higher priority)`;
  } else {
    result =
      trainA.arrival <= trainB.arrival
        ? `${trainA.name} should go first (earlier arrival)`
        : `${trainB.name} should go first (earlier arrival)`;
  }

  res.json({ decision: result });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
