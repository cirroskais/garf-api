interface TokenRequest {
    code: string;
}

interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export default async function (req: Request): Promise<Response> {
    if (req.method !== "POST") return new Response("garf expected a POST request...");
    if (!req.headers.get("Content-Type")) return new Response("garf expected some jay sawn...");
    if (!req.headers.get("Content-Type")?.includes("application/json")) return new Response("garf expected some jay sawn...");

    const body = (await req.json()) as TokenRequest;
    if (!body) return new Response("garf expected some jay sawn...");

    const response = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code: body?.code,
        }),
    });

    const { access_token } = (await response.json()) as TokenResponse;

    return new Response(access_token);
}
