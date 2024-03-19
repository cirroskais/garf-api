import token from "./routes/token";
import config from "./routes/config";
import user from "./routes/user";
import negotiate from "./routes/negotiate";

type WebSocketData = {
    authenticated: boolean;
    identity: {
        id: string;
        username: string;
        avatar: string;
    };
};

const terryIdentity = {
    id: "869016244613951539",
    username: "terry218742",
    avatar: "",
};

const server = Bun.serve<WebSocketData>({
    port: 3000,
    async fetch(req, server) {
        const url = new URL(req.url);

        console.log(`${new Date().toUTCString()} ${req.method} ${url.pathname}`);

        if (url.pathname === "/") return await config(req);
        if (url.pathname === "/ws") return await negotiate(req, server);
        if (url.pathname === "/token") return await token(req);
        if (url.pathname === "/user") return await user(req);
        return new Response("garf dont know what want...");
    },
    websocket: {
        message(ws, message) {
            if (!ws.data.authenticated) ws.close();
            server.publish("global", JSON.stringify({ message, identity: ws.data.identity }));
        },
        open(ws) {
            const message = `${ws.data.identity.username} has joined the channel.`;
            server.publish("global", JSON.stringify({ message, identity: terryIdentity }));
            ws.subscribe("global");
        },
        close(ws, code, msg) {
            const message = `${ws.data.identity.username} has left the channel.`;
            server.publish("global", JSON.stringify({ message, identity: terryIdentity }));
            ws.unsubscribe("global");
        },
        drain(ws) {},
    },
});

console.log("Listening on 0.0.0.0:3000");
