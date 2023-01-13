import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";

export default {
    Mutation:{
        login: async(_, {username, password}) =>{
            const user = await client.user.findFirst({where:{username}});
            if(!user){
                return {
                    ok: false,
                    error: "User not found.",
                };
            }
            const passwordOk = await bcrypt.compare(password, user.password);
            if(!passwordOk){
                return{
                    ok: false,
                    error: "Incorrect password",
                }
            }
            // json web token
            // token은 서버가 프론트엔드에 연결되어 있지 않을 때 사용
            // 우리가 사인한 것인지 확인하는 용도. 비밀번호 같은거 넣으면 안됨
            // jwt.io에서 내용물 확인 가능
            const token = await jwt.sign({id:user.id}, process.env.SECRET_KEY);
            return{
                ok: true,
                token,
            };
        },
    }
}