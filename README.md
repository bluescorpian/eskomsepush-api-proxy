# Proxy for EskomSePush API

This repository contains a proxy server that allows you to use [EskomSePush API](https://eskomsepush.gumroad.com/l/api) in a web application. Currently, the proxy server only supports Cloudflare Workers. If you need support for another cloud provider, please feel free to submit an issue.

To use this proxy server, you'll need to provide your API key into the token.js file. Once you've done that, you can deploy the proxy server to Cloudflare Workers.

## Deployment

To deploy the proxy server to Cloudflare Workers, you can use the wrangler CLI. Once you have installed the CLI, you can run the following command:

```
wrangler publish
```

---

Example token.js

```js
export default 'xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx';
```
