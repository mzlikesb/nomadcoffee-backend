require('dotenv').config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";
import {getUser} from "./users/users.utils";
import {typeDefs, resolvers} from "./schema";

const PORT = process.env.PORT;

const startServer = async () => {

    const app = express();
    const apollo = new ApolloServer({
        resolvers,
        typeDefs,
        context: async ({req}) => {
            // http header에서 token을 꺼내옴
            return {
                loggedInUser: await getUser(req.headers.token)
            };
        },
    });

    await apollo.start();
    app.use(logger("tiny"));
    apollo.applyMiddleware({ app });
    app.use("/static", express.static("uploads"));
    app.listen({port:PORT}, () => {
        console.log(`🚀 Server: http://localhost:${PORT}${apollo.graphqlPath}`);
    });
}

startServer();