import jwt from 'jsonwebtoken';

const generarToken = (id) => {
    return jwt.sign({id:id}, process.env.JWT_SECRET,{expiresIn: '15d'});
}

 export default generarToken;