/** @type {import('next').NextConfig} */
import withAntdLess from 'next-plugin-antd-less';

const nextConfig = withAntdLess({
    modifyVars: { '@primary-color': '#1DA57A' }, // You can override Ant Design variables here
    // lessVarsFilePath: './src/styles/variables.less', // Path to your Less variables file (optional)
    lessVarsFilePathAppendToEndOfContent: false, // Append variables to end of content
    cssLoaderOptions: {},
    webpack(config) {
        return config;
    },
});

export default nextConfig;
