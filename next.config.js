/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração básica sem bloqueios
  reactStrictMode: true,
  env: {
    // Ignorar variáveis de npm no cliente
    NPM_RC: undefined,
    NPM_TOKEN: undefined,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuração para evitar avisos de variáveis de ambiente
  serverExternalPackages: ["@supabase/supabase-js"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignorar variáveis de ambiente específicas do servidor no cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
