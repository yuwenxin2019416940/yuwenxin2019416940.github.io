/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2021/10/13/Typora使用教程/index.html","f4a5dd5c20a746ce4792eb097bb42e68"],["/2021/10/13/hello-world/index.html","797cf47c5758b1ba72374aa40b6d53b8"],["/2021/10/13/new-article/image-20211006235731671.png","c71b233c052a8fe9a6c6e2605f891292"],["/2021/10/13/new-article/index.html","bc2adf1279e927ad117bc2ce0068a339"],["/2021/10/18/centos下安装python3.7/index.html","baf1cc90a7881d1c0d6ecdb2a152f660"],["/2021/10/18/一、配置windows下的Hadoop和Spark环境/index.html","b695192e304a8dfa0dd99c315b6c6060"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img1.png","ec87614a685299a9adc9827ab8b70bac"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img2.png","10dc778166949a36a954fc73554b89eb"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img3.png","b764e4fbf9a8d863c4a327d3a436c3dc"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img4.png","c9c7a31c683643039eae1f99576c69a8"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img5.png","91385696b7f89d16df8ca8bff1a31fc4"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img6.png","fdab4ac44ec01d3a8a75ac3912278662"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img7.png","cad43cc3c076eadd7b8c9996c88e0055"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/index.html","ef96eb653b79356bafd214fc161e84b8"],["/Gallery/index.html","11fabbae02b549a816bb936f271d92d3"],["/about/index.html","9e4f3df1e387a12b07a69ac650e5977a"],["/archives/2021/10/index.html","3fcc69800cc6336cbe5c69ebd3e9c7af"],["/archives/2021/index.html","bb58d89c9232c08ebc680fee001712f4"],["/archives/index.html","f33db3e2c4fca20481ccd47931f6b043"],["/categories/Spark/index.html","b58a1b6af43074fa3db167adc2b7921f"],["/categories/index.html","064ed7899ee12e20bb3b6796437950b1"],["/categories/博客搭建/index.html","90913a9df4dbcfbedcf3825fb850f572"],["/css/index.css","aab33ec218d05b729bf0d4cb91cd1fed"],["/css/mycss.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/algolia.svg","88450dd56ea1a00ba772424b30b7d34d"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/fm5.jpg","39a03bd523e3a993d363f10f2fe2e25d"],["/img/fm6.jpg","3e12cdfc89f59de2b454bf44184038dc"],["/img/fm7.jpg","87a17e63a456ec77840f5ae38cd2c428"],["/img/fm8.jpg","7f70a87f898a8a84ee1d9d10b57b74a1"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/wanxia.jpg","edfa2dbfffeef9ffc13d3d2b0551b678"],["/img/xingquan.jpg","9d077e81d58d24263e20ab4f0e4ade6a"],["/index.html","b85a895111643661d3382bdd9e8085f9"],["/js/fairyDustCursor.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/main.js","240e062def7897dd4c03a12bf07fdc65"],["/js/search/algolia.js","533d980c0d50a0d0d7fe34c41a3e2100"],["/js/search/local-search.js","33b3c0e197c029d5b198059220bbd5ab"],["/js/tw_cn.js","b3810513e04b13b2d18c6b779c883f85"],["/js/utils.js","12cef07c2e9bc8841a5380df4fd342f5"],["/link/index.html","59b788f4a90e847ae2e1f4b255adf43c"],["/movies/index.html","4d8ecba6c20f44b9ed2d0d3ab02f4503"],["/music/index.html","b02cbe4f6fd9d4bf33a5d25fbaf3ae45"],["/sw-register.js","b6f79ac67ccc239df80191d8606139d3"],["/tags/Spark-Python-虚拟机/index.html","bd795663edbca546559c9ffcc8ce2be2"],["/tags/Spark/index.html","3084d5e51d13e027e252504be3e39fb6"],["/tags/index.html","d53a93ac2e6d673eb9a9893dcc25065d"],["/tags/博客/index.html","e99912261c6262e24db78b00a176f541"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
