##  🛍️ Tienda React – Proyecto de práctica
Este proyecto es una tienda online desarrollada en React con estilos usando Tailwind CSS. Ha evolucionado para gestionar productos directamente desde Firebase, ofreciendo una experiencia más dinámica y completa que un proyecto de práctica inicial. Permite navegar entre la pantalla de login, el listado de productos y el detalle individual, además de agregar y actualizar el catálogo en tiempo real.

##  🚀 Tecnologías utilizadas
React – Framework de UI
React Router DOM – Ruteo entre páginas
Tailwind CSS – Framework de estilos
Vite – Herramienta para desarrollo rápido
Firebase (Firestore) – Base de datos NoSQL para la gestión de productos en tiempo real.

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
│   ├── Product/  
│   │    └── ProductCard.jsx  
│   └── NuevoProducto/  
│       └── NuevoProducto.jsx  
├── Config/  
│   └── Firebase/  
│       └── Firebase.jsx   
│
├── Context/  
│   └── ProductProvider/  
│        └── ProductProvider.jsx   
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
│   └── ProductServices.js # Ahora se conecta a Firebase
│   └── getPRoducts.jsx
│
└── App.jsx  
```


## ⚙️ Instalación y uso  
1. Cloná este repositorio en tu máquina local:
git clone https://github.com/FlorenciaPenaranda/React_TP3

2. Navegá a la carpeta del proyecto e instalá las dependencias:
cd React_TP3
npm install

3. Iniciá el servidor de desarrollo:
npm run dev

4. Abrí tu navegador en http://localhost:5173 (o el puerto que indique Vite) para ver la aplicación en acción. 🌐

##  📌 Funcionalidades
✅ Vista de login (estática)
✅ Vista de registro (estática)
✅ Catálogo de productos (cargados desde Firebase)
✅ Agrega nuevos productos al catálogo (persistencia en Firebase)
✅ Actualización automática del catálogo al agregar un producto
✅ Detalle individual de producto
✅ Simulación de compra (descuenta stock)
✅ Diseño Responsive con Tailwind CSS
✅ Ruteo entre vistas

##  🗃️ Gestión de Datos
Los datos de los productos ya no se cargan desde un archivo JSON local. Ahora se gestionan y persisten directamente en Firebase Firestore, lo que permite una administración de datos más dinámica y real. La aplicación interactúa con Firestore para:

Cargar la lista completa de productos.
Agregar nuevos productos a la base de datos.
Actualizar la lista de productos en la interfaz de usuario después de agregar un nuevo elemento.

## ☁️ Accede a tu Tienda Online
¡La tienda online ya está en vivo! Puedes explorar la versión más reciente del proyecto desplegada en Vercel.

🌐 Visita la Tienda Aquí:
https://reactjstpfinal.vercel.app/


Simplemente haz clic en el enlace de arriba o cópialo y pégalo en tu navegador para empezar a explorar la tienda.