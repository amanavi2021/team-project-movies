var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in a){var o=a[e];delete a[e];var n={id:e,exports:{}};return t[e]=n,o.call(n.exports,n,n.exports),n.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},e.parcelRequired7c6=o);var n=o("76WF6");o("iyB0E"),o("gjiCh"),o("1bQoE"),o("bTcpz");var r=o("3P3PE"),d=o("ccqIN");o("c9UGP");o("4S0r6"),o("kF8TM"),(0,r.paginationLocalStorage)("watched");const i=document.querySelector(".my-gallery");i.addEventListener("click",n.default);document.querySelector(".header__buttons-library").addEventListener("click",(function(e){const t=e.target;if(t===c)return d.default.load("queue")?((0,r.paginationLocalStorage)("queue"),void u(t)):void u(t);if(t===l)return d.default.load("watched")?((0,r.paginationLocalStorage)("watched"),void u(t)):void u(t)}));const c=document.querySelector('[data-add="queue"]'),l=document.querySelector('[data-add="watched"]');function u(e){e===c?(l.classList.remove("btn--active"),c.classList.add("btn--active")):(l.classList.add("btn--active"),c.classList.remove("btn--active"))}
//# sourceMappingURL=my-library.a338959a.js.map