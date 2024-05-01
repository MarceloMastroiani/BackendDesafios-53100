import { Router } from "express";
import userModel from "../dao/models/users.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

//LOGICA DEL REGISTER
// router.post("/register", async (req, res) => {
//   //logica a implementar
//   const {first_name, last_name, email, age, password} = req.body
//   const exist = await userModel.findOne({email:email}) 
//   if(exist){
//     return res
//     .status(400)
//     .send({status:"error", error:"el correo ya existe"})
//   }

//   const user = {
//     first_name,
//     last_name,
//     email,
//     age,
//     password,
//   }
//   const result = await userModel.create(user)
//   console.log(result)
//   res.status(201).send({status:"success",payload:result})
// });
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.status(201).send({ status: "success", message: "Usuario registrado" });
  }
);
router.get("/failregister", async (req, res) => {
  console.log("error");
  res.send({ error: "Falló" });
});

//LOGICA DEL LOGIN
// router.post("/login", async (req, res) => {
//   //logica a implementar
//   const {email,password} = req.body
//   const user = await userModel.findOne({email,password})
//   if(!user){
//     return res.status(400).send({status:"error", error:"error en las credenciales"})
//   }

//   req.session.user = {
//     name:`${user.first_name} ${user.last_name}`,
//     email:user.email,
//     age:user.age
//   }
//   res.status(200).send({
//     status:"success",
//     payload: req.session.user,
//     message:"inicio; exitoso;"
//   })
// });
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    if (!req.user) return res.status(400).send("error");
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };
    res.status(200).send({ status: "success", payload: req.user });
  }
);
router.get("/faillogin", async (req, res) => {
  console.log("error");
  res.send({ error: "Fallo" });
});

//LOGICA DEL LOGOUT
router.get('/logout', (req,res) => {
    req.session.destroy((err) => {
      if(err){
        return res
        .status(500)
        .send('Hubo un error al destruir la sesion')
      }
  })
  res.redirect('/login')
})

//RESTAURAR CONTRASENIA
router.post("/restore", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  console.log(user);
  if (!user)
  return res
.status(400)
.send({ status: "error", message: "No se encuentra el user" });
  const newPass = createHash(password);

  await userModel.updateOne({ _id: user._id }, { $set: { password: newPass } });

  res.send({ status: "success", message: "Updated password" });
});

//INICIAR SESION CON GITHUB
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    //podemos enviar una respuesta
  }
);
//RUTA QUE NOS LLEVA A GITHUD LOGIN
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  }
);


export default router;