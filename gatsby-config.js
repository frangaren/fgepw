module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
    title: 'fge.pw',
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-image',
    'gatsby-plugin-react-svg',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/resources/images/icon.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/resources/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'settings',
        path: './site/settings/',
      },
      __key: 'settings',
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'jsx',
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-plugin-portal',
      options: {
        key: 'portal',
        id: 'portal',        
      },
    },
  ],
};
