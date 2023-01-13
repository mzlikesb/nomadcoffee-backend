import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { createWriteStream } from "fs";

const resolverFn = async (
    _,
    { username, email, name, password: newPassword, avatar},
    { loggedInUser }
    ) => {
        let avatarURL = null;
        if(avatar){
            const {filename, createReadStream } = await avatar;
            const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
            const readStream = createReadStream();
            // process.cwd() -> current working directory
            const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
            readStream.pipe(writeStream);
            avatarURL = `http://localhost:4000/static/${newFilename}`;
        }
        let uglyPassword = null;
        if(newPassword){
            uglyPassword = await bcrypt.hash(newPassword, 10);
        } 
        const updatedUser = await client.user.update({
            where:{id: loggedInUser.id,},
            data:{
            username,
            name,
            email,
            ...(uglyPassword && {password:uglyPassword}),
            ...(avatarURL && {avatarURL})
            }
        });
        if(updatedUser.id){
            return {
                ok: true,
            };
        }else{
            return {
                ok: false,
                error: "Could not update profile",
            };
        }
    };

export default{
    Mutation:{
        editProfile: protectedResolver(resolverFn),
    },
};