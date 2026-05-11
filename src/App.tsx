import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Páginas Públicas
import Home from './pages/Home';
import Productos from './pages/Productos';

function App() {
  return (
    <Routes>
      {/* --- Rutas Públicas --- */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="index.html" element={<Home />} />
        <Route path="productos.html" element={<Productos />} />
      </Route>
    </Routes>
  );
}

export default App;
