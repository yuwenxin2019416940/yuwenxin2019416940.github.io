/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2021/10/13/Typora使用教程/index.html","f6ab9ad1c840fed905cc6bac262c044a"],["/2021/10/13/hello-world/index.html","6d0aac83c83e841fa1405fcfc8356d58"],["/2021/10/13/new-article/image-20211006235731671.png","c71b233c052a8fe9a6c6e2605f891292"],["/2021/10/13/new-article/index.html","fd7ec5c85cc9bc5c596b433eba831b10"],["/2021/10/18/centos下安装python3.7/index.html","ecaa28552a1a964bed5a0b654506b9b5"],["/2021/10/18/一、配置windows下的Hadoop和Spark环境/index.html","7e32ba35622f2eb794e93ed6220db4e1"],["/2021/10/29/C语言学习-翁恺/index.html","ab6e88a76a72a1a81fd4b280439e8551"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img1.png","ec87614a685299a9adc9827ab8b70bac"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img2.png","10dc778166949a36a954fc73554b89eb"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img3.png","b764e4fbf9a8d863c4a327d3a436c3dc"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img4.png","c9c7a31c683643039eae1f99576c69a8"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img5.png","91385696b7f89d16df8ca8bff1a31fc4"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img6.png","fdab4ac44ec01d3a8a75ac3912278662"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/img7.png","cad43cc3c076eadd7b8c9996c88e0055"],["/2021/10/29/Spark学习（一）——Spark的设计与运行原理/index.html","ada80b5de3d261589adc68c3329fca71"],["/2021/11/05/Spark学习（二）/img1.png","428b90e37e581759e775f5f5fd609712"],["/2021/11/05/Spark学习（二）/img2.png","81666a5e62b7cacdf7ab58fd09ad494c"],["/2021/11/05/Spark学习（二）/img3.png","8e8e1526041417a8e833415dbbb932e6"],["/2021/11/05/Spark学习（二）/img4.png","2ee0bbd968409c9e903a337155f2de03"],["/2021/11/05/Spark学习（二）/index.html","14099ab4836f3e10d7c2d6adc43118cb"],["/2021/11/12/kafka/index.html","8a8b900381f00e3b611ecdcb09717774"],["/Gallery/index.html","746707f246617ec7d1143edfb0a10d13"],["/about/index.html","894913ae0a0f660b31dded5a6684d48a"],["/archives/2021/10/index.html","f7ca8e01a9dfb3fd6f362f8aa0c1c91b"],["/archives/2021/11/index.html","81ed2798c484e17ebc1050edfcd3baa0"],["/archives/2021/index.html","07fc97d9c4e470c088e19060423b5d86"],["/archives/index.html","f2ab8be1c25b71472b5751470ad0b823"],["/categories/C语言学习/index.html","316e5b793591de09478d05dc2a9db851"],["/categories/Spark/index.html","2b0e6d992575bc8d5d69212bd4a58075"],["/categories/index.html","d2a1e054179786e558cf331fad6d304a"],["/categories/博客搭建/index.html","b2e45f4cf94239164483567a31353a30"],["/css/index.css","aab33ec218d05b729bf0d4cb91cd1fed"],["/css/mycss.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/algolia.svg","88450dd56ea1a00ba772424b30b7d34d"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/fm5.jpg","39a03bd523e3a993d363f10f2fe2e25d"],["/img/fm6.jpg","3e12cdfc89f59de2b454bf44184038dc"],["/img/fm7.jpg","87a17e63a456ec77840f5ae38cd2c428"],["/img/fm8.jpg","7f70a87f898a8a84ee1d9d10b57b74a1"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/wanxia.jpg","edfa2dbfffeef9ffc13d3d2b0551b678"],["/img/xingquan.jpg","9d077e81d58d24263e20ab4f0e4ade6a"],["/index.html","d8fe20dd8f092ecdbd9c4fb8b0d57909"],["/js/fairyDustCursor.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/main.js","240e062def7897dd4c03a12bf07fdc65"],["/js/search/algolia.js","533d980c0d50a0d0d7fe34c41a3e2100"],["/js/search/local-search.js","33b3c0e197c029d5b198059220bbd5ab"],["/js/tw_cn.js","b3810513e04b13b2d18c6b779c883f85"],["/js/utils.js","12cef07c2e9bc8841a5380df4fd342f5"],["/link/index.html","4a67d121443235f775d2113c07ca6c2a"],["/movies/index.html","cad04c9f4d65123bd1c5723b9b1d0d0b"],["/music/index.html","c2ee62fad393dca171dd5415784ae056"],["/sw-register.js","6e2ff247d8321625cec8a0fe1f7b3f47"],["/tags/C语言/index.html","fba963453e2a4e2603850498fa8e72f3"],["/tags/Kafka/index.html","4e3a7d7007fb295bd68c7b84068691e6"],["/tags/Spark-Python-虚拟机/index.html","ae29293f673572c8a46648ee4cfeb12b"],["/tags/Spark/index.html","27b50698f9c4ff526c86ff180970629e"],["/tags/index.html","77bf57af05eb0fcc6b9399dd7a9843c4"],["/tags/博客/index.html","c63415ffbea4cee9cae1a7e0aa48d18b"]];
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
