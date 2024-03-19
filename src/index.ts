import token from "./routes/token";
import config from "./routes/config";
import negotiate from "./routes/negotiate";

Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);

        console.log(`${new Date().toUTCString()} ${req.method} ${url.pathname}`);

        if (url.pathname === "/") return await config(req);
        if (url.pathname === "/token") return await token(req);
        if (url.pathname === "/negotiate") return await negotiate(req);
        return new Response("garf dont know what want...");
    },
    websocket: {
        message(ws, message) {},
        open(ws) {},
        close(ws, code, message) {},
        drain(ws) {},
    },
});

console.log("Listening on 0.0.0.0:3000");
