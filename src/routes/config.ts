export default async function (req: Request): Promise<Response> {
    return new Response(
        JSON.stringify({
            DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        }),
        { headers: { "Content-Type": "application/json" } }
    );
}
