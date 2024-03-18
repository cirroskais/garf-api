import token from "./routes/token";

Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);

        console.log(`${new Date()} ${req.method} ${url.pathname}`);

        if (url.pathname === "/") return new Response("hello yes this is garf");
        if (url.pathname === "/token") return await token(req);
        return new Response("garf dont know what want...");
    },
});

console.log("Listening on 0.0.0.0:3000");
