export default {
    // Move into 'src' folder to keep root tidy
    public: './src/static',
    renderers: ["@astrojs/renderer-vue"],
    buildOptions: {
        site: 'https://donnarice.work'
    },
    devOptions: {
        // For use in docker container
        hostname: '0.0.0.0'
    }
}
