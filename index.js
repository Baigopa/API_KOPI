const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('☕ API Kopi berjalan! Gunakan endpoint /coffees');
});

// ✅ Data kopi lengkap (12 jenis)
let coffees = [
  {
    id: 1,
    name: "Arabica",
    price: 50000,
    region: "Aceh Gayo",
    flavorProfile: ["Citrus", "Floral", "Sweet"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_beans_arabica.jpg",
    description: "Kopi dengan rasa halus dan tingkat keasaman yang lebih tinggi."
  },
  {
    id: 2,
    name: "Robusta",
    price: 40000,
    region: "Lampung",
    flavorProfile: ["Strong", "Bitter", "Earthy"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Coffea_canephora_berries.jpg",
    description: "Kopi dengan rasa kuat dan kadar kafein tinggi."
  },
  {
    id: 3,
    name: "Liberica",
    price: 60000,
    region: "Jambi",
    flavorProfile: ["Smoky", "Woody", "Unique"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Coffea_liberica_fruit.jpg",
    description: "Jenis kopi langka dengan aroma buah dan rasa eksotis."
  },
  {
    id: 4,
    name: "Excelsa",
    price: 65000,
    region: "Sulawesi",
    flavorProfile: ["Fruity", "Tart", "Complex"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/37/Coffea_excelsa.jpg",
    description: "Memiliki rasa kompleks dengan sedikit asam dan aroma buah kering."
  },
  {
    id: 5,
    name: "Toraja",
    price: 80000,
    region: "Tana Toraja",
    flavorProfile: ["Earthy", "Nutty", "Sweet"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Kopi_Toraja.jpg",
    description: "Kopi premium dari Sulawesi dengan karakter lembut dan aroma rempah."
  },
  {
    id: 6,
    name: "Kintamani",
    price: 75000,
    region: "Bali",
    flavorProfile: ["Citrus", "Clean", "Sweet"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bali_Kintamani_coffee.jpg",
    description: "Kopi khas Bali dengan rasa jeruk yang segar dan aftertaste lembut."
  },
  {
    id: 7,
    name: "Mandheling",
    price: 70000,
    region: "Sumatera Utara",
    flavorProfile: ["Chocolate", "Full-bodied", "Spicy"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Mandheling_coffee.jpg",
    description: "Kopi Sumatera dengan rasa tebal, aroma herbal, dan sedikit manis."
  },
  {
    id: 8,
    name: "Luwak Coffee",
    price: 200000,
    region: "Sumatera",
    flavorProfile: ["Smooth", "Caramel", "Mild"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Kopi_Luwak_beans.jpg",
    description: "Kopi termahal di dunia yang difermentasi secara alami oleh luwak."
  },
  {
    id: 9,
    name: "Flores Bajawa",
    price: 85000,
    region: "Nusa Tenggara Timur",
    flavorProfile: ["Chocolate", "Floral", "Clean"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Flores_Bajawa_coffee.jpg",
    description: "Kopi dengan body sedang, aroma cokelat dan aftertaste bersih."
  },
  {
    id: 10,
    name: "Java Preanger",
    price: 70000,
    region: "Jawa Barat",
    flavorProfile: ["Caramel", "Nutty", "Balanced"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Java_preanger_coffee.jpg",
    description: "Kopi legendaris dengan keseimbangan rasa manis dan aroma kacang."
  },
  {
    id: 11,
    name: "Gayo Wine",
    price: 90000,
    region: "Aceh Tengah",
    flavorProfile: ["Fruity", "Fermented", "Sweet"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Gayo_Wine_Coffee.jpg",
    description: "Kopi dengan proses fermentasi khusus menghasilkan aroma wine."
  },
  {
    id: 12,
    name: "Papua Wamena",
    price: 95000,
    region: "Papua",
    flavorProfile: ["Herbal", "Sweet", "Clean"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Papua_Wamena_coffee.jpg",
    description: "Kopi organik dari dataran tinggi Papua dengan aroma ringan dan rasa bersih."
  }
];

// --- ROUTES ---
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

// Jalankan server
app.listen(PORT, () => console.log(`☕ Server running on port ${PORT}`));
