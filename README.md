##  🛍️ Tienda React – Proyecto de práctica
Este proyecto es una tienda online desarrollada en React con estilos usando Tailwind CSS, que simula la venta de productos (Apple Watch) desde un archivo de datos local (mock_data.json). Incluye navegación entre pantalla de login, listado de productos y detalle individual.

##  🚀 Tecnologías utilizadas
React – Framework de UI
React Router DOM – Ruteo entre páginas
Tailwind CSS – Framework de estilos
Vite – Herramienta para desarrollo rápido
JSON local – Datos simulados

## 📁 Estructura del proyecto
```plaintext
src/
├── Components/  
│   ├── Login  
│   │   └── Login.jsx  
│   ├── Register  
│   │   └── Register.jsx  
│   ├── NavBar/  
│   │   └── NavBar.jsx  
│   └── Product/  
│       └── ProductCard.jsx  
│
├── Screens/  
│   ├── LoginScreen/  
│   │   └── LoginScreen.jsx  
│   ├── RegisterScreen/  
│   │   └── RegisterScreen.jsx  
│   ├── ProductDetailScreen/  
│   │   └── ProductDetailScreen.jsx  
│   └── ProductsScreen/  
│       └── ProductsScreen.js  
│
├── Services/  
│   └── mock_data.json  
└── App.jsx  
```


## ⚙️ Instalación y uso  
Cloná el proyecto:
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

Instalá dependencias:
npm install

Corré el servidor:
npm run dev
Abrí el navegador en http://localhost:5173 o el puerto que indique Vite.

##  📌 Funcionalidades
✅ Vista de login (estática)
✅ Vista de registro (estática)
✅ Catálogo de productos
✅ Detalle individual de producto
✅ Simulación de compra (descuenta stock)
✅ Responsive con Tailwind
✅ Ruteo entre vistas

##  🗃️ Datos simulados
Los productos están cargados desde el archivo:

src/Services/mock_data.json
Cada producto tiene:
id
nombre
imagen
precioReal
precioFinal
porcentajeOferta
cantidadDisponible
detalles (técnicos)