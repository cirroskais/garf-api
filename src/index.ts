import token from "./routes/token";

Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/") return new Response("hello yes this is garf");
        if (url.pathname === "/api/token") return await token(req);
        return new Response("garf dont know what want...");
    },
});
