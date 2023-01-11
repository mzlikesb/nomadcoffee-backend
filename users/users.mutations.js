import bcrypt from "bcrypt";
import client from "../client";

export default {
    Mutation:{
        createAccount: async (_, {username, email, name, password}) => {
            try{
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [{username},{email}],
                    }
                });
                if(existingUser){
                    throw new Error("Check that the username / email aren't taken");
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                const user = client.user.create({data:{
                    username, email, name, password:uglyPassword,
                }});
                return user;
            } catch (e) {
                return e;
            }
        },
    }
};