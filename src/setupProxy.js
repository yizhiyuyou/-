const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/rest', {
    // target: 'https://fuwuqu.trial.hndfsj.net',
    target: 'http://192.168.10.123:8848/zhfwq',
    changeOrigin: true,
    onProxyRes: cookiePathRewriter,
    pathRewrite: {
      '^/rest': '/rest'
    }
  }))

  app.use(proxy('/resource', {
    // target: 'https://fuwuqu.trial.hndfsj.net',
    target: 'http://192.168.10.123:8848/zhfwq',
    changeOrigin: true,
    onProxyRes: cookiePathRewriter,
    pathRewrite: {
      '^/resource': '/resource'
    }
  }))
}

/**
 * Cookie Path Rewrite Helper
 * how to use: onProxyRes: cookiePathRewriter (in proxyTable items.)
 */
function cookiePathRewriter (proxyRes, req, res) {
  // judge if "set-cookie" is included in the response header
  let cookies = proxyRes.headers['set-cookie']
  if (!cookies || cookies.length === 0) {
    delete proxyRes.headers['set-cookie']
    return
  }

  // rewrite cookie path
  let cookieItems = cookies[0].split(';')
  let newCookie = ''
  for (let i = 0, len = cookieItems.length; i < len; i++) {
    if (newCookie.length > 0) {
      newCookie += ';'
    }
    // judge if start with "path=" or "Path="
    if (cookieItems[i].indexOf('path=') >= 0) {
      newCookie += 'path=/'
    } else if (cookieItems[i].indexOf('Path=') >= 0) {
      newCookie += 'Path=/'
    } else {
      newCookie += cookieItems[i]
    }
  }
  // rewrite the cookie
  proxyRes.headers['set-cookie'] = newCookie
}