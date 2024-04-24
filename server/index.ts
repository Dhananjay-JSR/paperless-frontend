// // const express = require("express");
// // const { Sequelize, DataTypes } = require("sequelize");
// import express from "express";
// import { Sequelize, DataTypes } from "sequelize";
// const app = express();
// const port = process.env.PORT;

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "myDatabase.db",
// });
// const StorageEngine = sequelize.define("StorageEngine", {
//   code: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   languageType: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   url: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.TEXT,
//   },
// });
// // Add Body Parser
// app.use(express.json());

// // Allow CORS
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// // Initialize DB migration
// (async () => {
//   await sequelize.sync();

//   //  GET request handler
//   // Routes Point to /api/{url_id}
//   app.get("/api", async (req, res) => {
//     const ID_Querry = req.query.id;
//     try {
//       const data = await StorageEngine.findOne({ where: { url: ID_Querry } });
//       res.json({ data });
//     } catch (err) {
//       // if query doesn't match with any specified key return 500 with message Error
//       console.error(err);
//       res.status(500).json({ message: "Error" });
//     }
//   });

//   // POST request handler
//   // Route Point to /api
//   // with Body Defined as
//   /*
// {
// code: "this will be from editor windos",
// language: "this is langiage type , like JS , C++ or anything"
// }
// */
//   app.post("/api", async (req, res) => {
//     // make id is helped fn used for generating Random URL at Server Side Takes the Length as Parameter
//     // and return back a random string of that length

//     let URL = makeid(4);
//     let code = req.body.code;
//     let languageType = req.body.language;
//     try {
//       await StorageEngine.create({ code, languageType, url: URL });
//       res.json({ URL });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error" });
//     }
//   });
// })();
// // Start listening on part
// // if port is underfined in OS Var then run on port 8080

// app.listen(port == undefined ? 8080 : port, () => {
//   console.log(`Server is running on port ${port == undefined ? 8080 : port}`);
//   console.warn("Coded by Dhananjay Senday All System Operational");
// });

// function makeid(length: number) {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// }
