import { Router } from "express";
import userModel from "../dao/models/users.js";

const router = Router();

//LOGICA DEL REGISTER
router.post("/register", async (req, res) => {
  //logica a implementar
  const {first_name, last_name, email, age, password} = req.body
  const exist = await userModel.findOne({email:email}) 
  if(exist){
    return res
    .status(400)
    .send({status:"error", error:"el correo ya existe"})
  }

  const user = {
    first_name,
    last_name,
    email,
    age,
    password,
  }
  const result = await userModel.create(user)
  console.log(result)
  res.status(201).send({status:"success",payload:result})
});
//LOGICA DEL LOGIN
router.post("/login", async (req, res) => {
  //logica a implementar
  const {email,password} = req.body
  const user = await userModel.findOne({email,password})
  if(!user){
    return res.status(400).send({status:"error", error:"error en las credenciales"})
  }

  req.session.user = {
    name:`${user.first_name} ${user.last_name}`,
    email:user.email,
    age:user.age
  }
  res.status(200).send({
    status:"success",
    payload: req.session.user,
    message:"inicio; exitoso;"
  })
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

export default router;