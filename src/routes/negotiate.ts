import type { Server } from "bun";
import { decrypt } from "../lib/encryption";
import type { PartialDiscordUser } from "./token";

interface NegotiateRequest {
    id: string;
    iv: string;
}

export default async function (req: Request, server: Server): Promise<void | Response> {
    if (req.method !== "GET") return new Response("garf expected a GET request...");
    const url = new URL(req.url);

    const id = url.searchParams.get("id");
    const iv = url.searchParams.get("iv");
    if (!id || !iv) return new Response("broken id and iv!!!");

    const decrypted = await decrypt(id, iv);
    if (!decrypted) return new Response("invalid identity!!!!!");
    const identity = JSON.parse(decrypted.decrypted) as PartialDiscordUser;

    const success = server.upgrade(req, { data: { authenticated: true, identity } });
    return success ? undefined : new Response("WebSocket upgrade error", { status: 400 });
}
