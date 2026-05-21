// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: ["/*"],
  exclude: ["/css/*", "/js/*", "/img/*", "/icons/*", "/*.txt", "/*.xml", "/*.ico", "/*.json", "/*.webmanifest"]
};

// ../../../AppData/Local/npm-cache/_npx/0eedb5afd4158ff3/node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "C:\\Users\\dimit\\Downloads\\New folder\\pivottft-landing\\.wrangler\\tmp\\pages-JP9Cq2\\functionsWorker-0.27605157785765333.mjs";
import { isRoutingRuleMatch } from "C:\\Users\\dimit\\AppData\\Local\\npm-cache\\_npx\\0eedb5afd4158ff3\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
export * from "C:\\Users\\dimit\\Downloads\\New folder\\pivottft-landing\\.wrangler\\tmp\\pages-JP9Cq2\\functionsWorker-0.27605157785765333.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=a0hsco1an57.js.map
