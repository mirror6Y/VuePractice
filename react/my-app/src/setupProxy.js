const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/system',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8088',
      changeOrigin: true,
    })
  );
};