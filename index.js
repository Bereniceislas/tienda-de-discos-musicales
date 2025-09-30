// index.js
const app = require("./server");
const PORT = 5500;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
