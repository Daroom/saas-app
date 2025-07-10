// postcss.config.js
import path from "path";

export default {
  plugins: {
    "postcss-import": {
      resolve(id, basedir) {
        if (id.startsWith("@saas-app/ui")) {
          // Resolve alias manually
          return path.resolve(
            __dirname,
            "packages/ui/src",
            id.replace("@saas-app/ui/", "")
          );
        }
        return id;
      },
    },
    "@tailwindcss/postcss": {}
  },
};
