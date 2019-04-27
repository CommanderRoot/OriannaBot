import { ConnectionConfig } from "knex";

interface Configuration {
    riot: {
        apiKey: string;
        tiers: string[];
        refreshToken: string;
        rankedQueues: { [key: string]: string };
    };
    discord: {
        clientId: string;
        clientSecret: string;
        owner: string;
        token: string;
        emoteServers: string[];
    };
    reddit: {
        clientId: string;
        clientSecret: string;
    };
    web: {
        url: string;
        port: number;
    };
    elastic: {
        enabled: boolean;
        host: string;
        auth: string;
    };
    updater: {
        masteryGamesInterval: number;
        masteryGamesAmount: number;

        rankedTierInterval: number;
        rankedTierAmount: number;

        accountInterval: number;
        accountAmount: number;
    };
    badges: { [key: string]: {
        small: string;
        big: string;
    } };
    db: ConnectionConfig;
    ffmpeg: string;
    dblToken: string;
}

const config: Configuration = require("../config.json");
export default config;