const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // pakai env PORT kalau ada

app.use(express.json());

app.get('/', (req, res) => {
  res.send('☕ API Kopi berjalan! Gunakan endpoint /coffees');
});

let coffees = [
  { id: 1, name: "Arabica", price: 50000 },
  { id: 2, name: "Robusta", price: 40000 }
];

app.get('/coffees', (req, res) => res.json(coffees));
app.get('/coffees/:id', (req, res) => {
  const coffee = coffees.find(c => c.id == req.params.id);
  if (!coffee) return res.status(404).json({ message: 'Not found' });
  res.json(coffee);
});
app.post('/coffees', (req, res) => {
  const newCoffee = { id: Date.now(), ...req.body };
  coffees.push(newCoffee);
  res.status(201).json(newCoffee);
});
app.put('/coffees/:id', (req, res) => {
  const index = coffees.findIndex(c => c.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  coffees[index] = { ...coffees[index], ...req.body };
  res.json(coffees[index]);
});
app.delete('/coffees/:id', (req, res) => {
  coffees = coffees.filter(c => c.id != req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => console.log(`☕ Server running on port ${PORT}`));
