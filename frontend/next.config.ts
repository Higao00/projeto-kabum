import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,

    webpackDevMiddleware: (config: any) => {
        config.watchOptions = {
            poll: 1000, // Verificar mudanças nos arquivos
            aggregateTimeout: 300,
        };
        return config;
    },
};

export default nextConfig;
