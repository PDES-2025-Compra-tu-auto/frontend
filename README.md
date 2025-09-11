# 🚀 Frontend Compra tu auto

 Puede ejecutarse de tres formas distintas:

1. Usando **Docker**
2. De forma **local y aislada**
3. De forma **local con dependencia del backend**

---

## 📦 Requisitos

- [Node.js](https://nodejs.org/) (v20+ lts recomendado)
- [npm](https://www.npmjs.com/) (v8+)
- [Docker](https://www.docker.com/) (opcional para ejecución con contenedor)

---

## 🐳 Modo 1: Ejecutar con Docker

Este método corre el frontend en un contenedor Docker.

### 🔧 Build de la imagen

```bash

docker build -t my-frontend .

docker run -p 3000:3000 my-frontend
```

##  Modo 2: Ejecutar frontend local de modo aislado

Este metodo se utiliza unicamente para pruebas visuales del frontend

```bash

npm install

npm run dev
```
##  Modo 3: Ejecutar frontend local con dependencia del backend 

Este metodo seria el mas adecuado para probar la funcionalidad de la app con su flujo completo

```bash

npm install

npm run start

```


