/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração otimizada para Azure
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  
  // Configurações de ambiente
  env: {
    NPM_RC: undefined,
    NPM_TOKEN: undefined,
  },
  
  // Configurações de build
  eslint: {
    ignoreDuringBuilds: true, // Desabilitar temporariamente
  },
  typescript: {
    ignoreBuildErrors: true, // Desabilitar temporariamente
  },
  
  // Configurações de imagens otimizadas para Azure
  images: {
    unoptimized: false, // Habilitar otimização
    domains: ['localhost', 'your-azure-domain.azurewebsites.net'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configurações de output para Azure
  // output: 'standalone', // Desabilitado devido a problemas com symlinks no Windows
  
  // Configurações de servidor
  serverExternalPackages: ["@supabase/supabase-js"],
  
  // Configurações de webpack otimizadas
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    // Otimizações para produção
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
    
    return config
  },
  
  // Configurações de headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
