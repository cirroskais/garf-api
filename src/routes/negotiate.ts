import type { Server } from "bun";
import { decrypt } from "../lib/encryption";
import type { PartialDiscordUser } from "./token";

interface NegotiateRequest {
    id: string;
    iv: string;
}

export default async function (req: Request, server: Server): Promise<void | Response> {
    if (req.method !== "POST") return new Response("garf expected a POST request...");
    if (!req.headers.get("Content-Type")) return new Response("garf expected some jay sawn...");
    if (!req.headers.get("Content-Type")?.includes("application/json")) return new Response("garf expected some jay sawn...");

    const body = (await req.json()) as NegotiateRequest;
    if (!body) return new Response("garf expected some jay sawn...");

    const decrypted = await decrypt(body.id, body.iv);
    if (!decrypted) return new Response("invalid identity!!!!!");
    const identity = JSON.parse(decrypted.decrypted) as PartialDiscordUser;

    const success = server.upgrade(req, { data: { authenticated: true, identity } });
    return success ? undefined : new Response("WebSocket upgrade error", { status: 400 });
}
