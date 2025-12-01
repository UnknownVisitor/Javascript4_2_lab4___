"use strict";

const express = require("express");
const app = express();

const PI = Math.PI;

// --- DANE JOKEBOOK ---
const categories = ["funnyJoke", "lameJoke"];
const jokeData = {
  funnyJoke: [
    {
      joke: "Dlaczego komputer poszedł do lekarza?",
      response: "Bo złapał wirusa!",
    },
    {
      joke: "Dlaczego komputer nie może być głodny?",
      response: "Bo ma pełen dysk!",
    },
    {
      joke: "Co mówi jeden bit do drugiego?",
      response: "„Trzymaj się, zaraz się przestawiamy!”",
    },
  ],
  lameJoke: [
    {
      joke: "Dlaczego programiści preferują noc?",
      response: "Bo w nocy jest mniej bugów do łapania!",
    },
    {
      joke: "Jak nazywa się bardzo szybki programista?",
      response: "Błyskawiczny kompilator!",
    },
  ],
};

// --- ENDPOINTY ---

// 1. Punkt końcowy (GET): /jokebook/categories
// Zwraca listę dostępnych kategorii
app.get("/jokebook/categories", (req, res) => {
  res.json(categories);
});

// 2. Punkt końcowy (GET): /jokebook/joke/:category

app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;
  const jokes = jokeData[category];

  if (!jokes) {
    return res.status(404).json({ error: `no jokes for category ${category}` });
  }

  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});

// 3. Punkt końcowy (GET) - RANDOM JOKE

app.get("/jokebook/random", (req, res) => {
  const randomCategoryIndex = Math.floor(Math.random() * categories.length);
  const randomCategory = categories[randomCategoryIndex];

  const jokes = jokeData[randomCategory];

  // Losujemy żart
  const randomJokeIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomJokeIndex];

  // Zwracamy żart
  res.json({
    category: randomCategory,
    joke: randomJoke.joke,
    response: randomJoke.response,
  });
});

// Błąd 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 5076;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
