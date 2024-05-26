/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "a105b083cba380fbc3742758db342680"
  },
  {
    "url": "assets/css/0.styles.54c8ac04.css",
    "revision": "1d2dd05b9a3f5b2a2ce69130b9945c46"
  },
  {
    "url": "assets/img/addRole.91ebf415.png",
    "revision": "91ebf4158ee51e1bd8b66ac536bb0ba2"
  },
  {
    "url": "assets/img/getAllRoles.70458a56.png",
    "revision": "70458a5626a8bddd2426186914bc96b4"
  },
  {
    "url": "assets/img/getRole.65ea3ec8.png",
    "revision": "65ea3ec892221368dd6753ed8cf57d23"
  },
  {
    "url": "assets/img/relationalSchema.4d0bdb0b.png",
    "revision": "4d0bdb0b4bb3551211c4ab0253c38a6c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.254c1eae.js",
    "revision": "def2b8670f6b95b756be795b8656c2c0"
  },
  {
    "url": "assets/js/11.595fc8e9.js",
    "revision": "79570a04eb53bf60f0b04560b2867bf6"
  },
  {
    "url": "assets/js/12.9da44718.js",
    "revision": "9df1187ab9fd2e75490ccceb3c9cfd2b"
  },
  {
    "url": "assets/js/13.1a32d884.js",
    "revision": "1113d4eb3cfff3aa39261db8f6e3e197"
  },
  {
    "url": "assets/js/14.8b0f8636.js",
    "revision": "97416ea82ea8fe036118c373a594bf53"
  },
  {
    "url": "assets/js/15.5dcbb9c4.js",
    "revision": "160963e2bc7835bd9bfa45c99e15078c"
  },
  {
    "url": "assets/js/16.4efdb3f7.js",
    "revision": "20fd6a735c66d552a95845d40b92bcba"
  },
  {
    "url": "assets/js/17.6d03d3c1.js",
    "revision": "9ce134bf10be47cf61e99ea32bfa70e0"
  },
  {
    "url": "assets/js/18.f3bc2eee.js",
    "revision": "1dc63d918e39ef00e06058fb31b05ebc"
  },
  {
    "url": "assets/js/19.7a85532d.js",
    "revision": "489acdb4d50cf1f2db94cb901c68518b"
  },
  {
    "url": "assets/js/2.fa676c4f.js",
    "revision": "edac6f12dbfad66d77b9ccd6bdaa609e"
  },
  {
    "url": "assets/js/20.990ca6a3.js",
    "revision": "adcfd97301f8f39144f4c6fc5c7b1b2b"
  },
  {
    "url": "assets/js/21.8d9bd557.js",
    "revision": "31a0b73747da995861a52bdd484ee873"
  },
  {
    "url": "assets/js/22.25a830e7.js",
    "revision": "3c05ece83d41d4816334220d70553047"
  },
  {
    "url": "assets/js/23.d0986ff5.js",
    "revision": "48966cf4fcc437b6a3a499404716dce7"
  },
  {
    "url": "assets/js/24.2302c830.js",
    "revision": "38beade46131bf9d48b4bb685d1bfa85"
  },
  {
    "url": "assets/js/26.7fcefd6a.js",
    "revision": "8b1bc808543c94035cca0d470bb98355"
  },
  {
    "url": "assets/js/3.ec1bccff.js",
    "revision": "61d8856d351e279bb7a8b4e5a048fef0"
  },
  {
    "url": "assets/js/4.1f9d6c61.js",
    "revision": "6033654bcd46e34a0aeba25e8c1613b9"
  },
  {
    "url": "assets/js/5.20f937da.js",
    "revision": "45768fcab78b5ca64614e1c7bbc9ddc0"
  },
  {
    "url": "assets/js/6.a56d67b8.js",
    "revision": "560fb97fb048d1a48fae600027061a5b"
  },
  {
    "url": "assets/js/7.abf87cdc.js",
    "revision": "70856666753f4f52605b7c1f4a6a45b4"
  },
  {
    "url": "assets/js/8.0608c8fd.js",
    "revision": "95704084be5e8c797ab6ec46e05a1599"
  },
  {
    "url": "assets/js/9.0088f14a.js",
    "revision": "378214b361333fa8b7a491ce20acb1a8"
  },
  {
    "url": "assets/js/app.2c98f178.js",
    "revision": "683630297b575793e6ed703a4af02cd2"
  },
  {
    "url": "conclusion/index.html",
    "revision": "9247fd1c2cfa543dd57918b8e4c3c391"
  },
  {
    "url": "design/index.html",
    "revision": "2d73f03e2d1b2a4f9f073942d4641dc2"
  },
  {
    "url": "index.html",
    "revision": "baa279bd47ff7ae5ba16bede805a1dde"
  },
  {
    "url": "intro/index.html",
    "revision": "f388324ab70fcbefca6baebd76d84d68"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "c7cd4834734cc91dec883cc4ea22847a"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "0362eccfbc382b70d648465126de84c7"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "07e7ddb5b0333579f7522e3c9f2aa3b7"
  },
  {
    "url": "software/index.html",
    "revision": "0d3f33ed7a7e9f90b5b3d64a59e1a5a6"
  },
  {
    "url": "test/index.html",
    "revision": "56b2069e18033ef0b16f59447ff80d89"
  },
  {
    "url": "use cases/index.html",
    "revision": "96c0d5d4ed8417966234d115ab7347ac"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
