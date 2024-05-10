import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt' 


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash=(password)=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => {

  return bcrypt.compareSync(password, user.password);
};


export default __dirname;


/*
// Clave secreta para firmar el token JWT
const JWT_SECRET = "practica-integradora";
//hasheo de password
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//validar password
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

// Generar un token JWT
export const generateToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
};
export default __dirname;
*/