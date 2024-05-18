# Imagen oficial de Node.js
FROM node:16

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar 'package.json' y 'package-lock.json' desde la subcarpeta 'app'
COPY app/package*.json ./

# Instalar todas las dependencias, incluidas las de desarrollo
RUN npm install

# Copiar todos los archivos del proyecto al directorio de trabajo
COPY app/ ./

EXPOSE 3000

# Comando para ejecutar la aplicación con nodemon
CMD ["npm", "start"]
