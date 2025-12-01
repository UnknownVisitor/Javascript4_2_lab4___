"use strict";

const express = require("express");
const app = express();

// Middleware do obsługi JSON w body żądania
app.use(express.json());

const PI = Math.PI;

// --- DANE JOKEBOOK ---
const categories = ["funnyJoke", "lameJoke"];
// Zmieniamy const na let lub modyfikujemy obiekt bezpośrednio (obiekt jest mutowalny)
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

// --- ENDPOINTY GET ---

// 1. Kategorie
app.get("/jokebook/categories", (req, res) => {
  res.json(categories);
});

// 2. Żart z kategorii
app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;
  const jokes = jokeData[category];

  if (!jokes) {
    return res.status(404).json({ error: `no jokes for category ${category}` });
  }

  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});

// 3. Random joke
app.get("/jokebook/random", (req, res) => {
  const randomCategoryIndex = Math.floor(Math.random() * categories.length);
  const randomCategory = categories[randomCategoryIndex];
  const jokes = jokeData[randomCategory];

  const randomJokeIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomJokeIndex];

  res.json({
    category: randomCategory,
    joke: randomJoke.joke,
    response: randomJoke.response,
  });
});

// --- ENDPOINTY POST (Com4_2.2be) ---

// 4. Dodawanie nowego żartu
app.post("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;
  const { joke, response } = req.body;

  // Sprawdzamy czy kategoria istnieje
  if (!jokeData[category]) {
    return res.status(404).json({ error: `no jokes for category ${category}` });
  }

  // Walidacja danych wejściowych
  if (!joke || !response) {
    return res.status(400).json({ error: "Missing joke or response field" });
  }

  // Dodajemy nowy żart do tablicy
  jokeData[category].push({ joke, response });

  // Zwracamy sukces i dodany żart
  res.json({ success: "Joke added successfully", newJoke: { joke, response } });
});

// Błąd 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 5101;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
