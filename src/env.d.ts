declare module "bun" {
    interface Env {
        DISCORD_CLIENT_ID: string;
        DISCORD_CLIENT_SECRET: string;
        DISCORD_CLIENT_TOKEN: string;
        ENCRYPTION_KEY: string;
        ENCRYPTION_SALT: string;
    }
}
