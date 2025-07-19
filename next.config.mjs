/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['monaco-editor']
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Monaco Editor configuration
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' }
    })

    // Handle Monaco Editor in client-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false
      }
    }

    // Optimize bundle for DNA-Lang syntax highlighting
    config.resolve.alias = {
      ...config.resolve.alias,
      'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api.js'
    }

    // Add support for WebAssembly (for quantum simulations)
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true
    }

    return config
  },
  images: {
    domains: ['blob.v0.dev', 'avatars.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true
  },
  env: {
    CUSTOM_KEY: 'dna-lang-icrispr-v2-quantum',
    BUILD_TIME: new Date().toISOString(),
    VERSION: '2.0.0'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable static exports for better performance
  output: 'standalone',
  // Optimize for production
  swcMinify: true,
  // Enable compression
  compress: true,
  // PoweredByHeader
  poweredByHeader: false,
  // Generate ETags
  generateEtags: false,
  // Optimize images
  optimizeFonts: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNA-Lang-Version',
            value: '2.0.0'
          },
          {
            key: 'X-Powered-By-DNA',
            value: 'Living Software Evolution'
          }
        ]
      }
    ]
  }
}

export default nextConfig
