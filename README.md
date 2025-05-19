# 💥 Anti-Social Relational - Los Crudos

Proyecto desarrollado por el grupo **Los Crudos** para la materia _Estrategias de Persistencia_.  
Se trata de una aplicación web que explora interacciones sociales digitales de manera crítica y creativa.

---

## 🎯 Descripción

**Anti-Social Relational** es una interfaz experimental que simula una red social con un enfoque irónico sobre la conectividad digital y las relaciones interpersonales. Su diseño busca ser provocador, funcional y visualmente impactante.

—

#Esquema DER

![Esquema DER](./assets/EsquemaDER.png)

## 🚀 Funcionalidades Principales

- 🧩 Interfaz interactiva con usuarios ficticios
- 🧵 Feed dinámico con publicaciones generadas
- 📄 Documentación con Swagger (`swagger.yaml`)
- 🎭 Enfoque anti-convencional en la experiencia de usuario
- 💅 Estética disruptiva con diseño propio

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**
- **Express** `^5.1.0`
- **Joi** `^17.13.3`
- **Sequelize** `^6.37.7`
- **SQLite3** `^5.1.7`
- **Nodemon** (desarrollo) `^3.1.10`
- **Sequelize CLI** (desarrollo) `^6.6.3`

---

## ENDPOINTS

Los endpoints pueden ser visualizados en el Swagger incluido en el proyecto.  
Para visualizar el swagger:  
con el server corriendo (comando: npm run dev)
http://localhost:3001/api-docs

El puerto es configurable con la variable de entorno PORT, si no hay una configurada utiliza puerto 3001.

##Colecciones POSTMAN

Estos se encuentran en la carpeta src/data del proyecto

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu_usuario/anti-social-relational-los-crudos.git
cd anti-social-relational-los-crudos

2.Instalar dependencias:


npm install

3.npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

4.Ejecutar el servidor de desarrollo: npm run dev

5.Abrir el navegador en:
"http://localhost:3001" o entorno de ejecución designado


Estructura del proyecto:

anti-social-relational-los-crudos/
├── assets/
├── src/
	└── controllers
	└── data
	└── db
	└── middlewares
	└── routes
	└── schemas
	└── main.js
├── package-lock.json
├── package.json
├── swagger.yaml
└── README.md
```

## Preguntas BONUS
1. ¿Cómo hacer el upload de imágenes asociadas a un POST y guardarlas en una carpeta del servidor?  
Se puede utilizar la libreria -multer en Node.js para manejar el upload de archivos,
esto permite guardar las imágenes en una carpeta local (por ejemplo, /public/images/posts).

2. ¿Cómo modelarías que un usuario pueda "seguir" a otros usuarios, y a su vez ser seguido por muchos? (Followers)  
Lo modelariamos con una relacion muchos a muchos (Many-to-Many), en donde se crea una tabla intermiedia llamada por ejemplo Followers, que contenga dos claves foráneas que apuntan a la misma tabla de usuarios (Users): una representando al que sigue (followerId) y otra al que es seguido (followedId), Sería similar a lo que hicimos con los Tags, donde un Post podía tener muchos Tags y un Tag podía estar en muchos Posts, usando una tabla intermedia PostTags.

3. ¿Qué estrategias usar para no consultar constantemente la base de datos si los posts no cambian seguido?  
Se pueden aplicar estrategias de caching, se nos ocurre canche en memoria con la herramienta Redis.

