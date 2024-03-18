import token from "./routes/token";
import config from "./routes/config";

Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);

        console.log(`${new Date().toUTCString()} ${req.method} ${url.pathname}`);

        if (url.pathname === "/") return await config(req);
        if (url.pathname === "/token") return await token(req);
        return new Response("garf dont know what want...");
    },
});

console.log("Listening on 0.0.0.0:3000");
