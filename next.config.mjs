/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true';
const computedBasePath = process.env.NEXT_BASE_PATH || undefined;
const computedAssetPrefix = computedBasePath ? `${computedBasePath}/` : undefined;

const nextConfig = {
    // Enable static export for GitHub Pages
    output: 'export',
    // Prevent image optimization which requires a server
    images: { unoptimized: true },
    // Helpful for GitHub Pages routing
    trailingSlash: true,
    // If deploying to a project site (username.github.io/repo), CI will set NEXT_BASE_PATH to '/repo'
    basePath: computedBasePath,
    assetPrefix: computedAssetPrefix,
};

export default nextConfig;
