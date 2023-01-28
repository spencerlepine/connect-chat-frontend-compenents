# Npm Package Publish

Documentation for publishing to npmjs.org

### Publish New Version

```sh
npm login
npm publish --dry-run
npm publish --access=public
```

### View Package

View the new package: https://www.npmjs.com/package/@spencerlepine/connect-chat-frontend-components


### [ENHANCEMENT] Adding ESM Support

Find more best practices and automation: https://snyk.io/blog/best-practices-create-modern-npm-package/

- Update or create new `rollup.config.js` with `output: 'esm'` configuration
- Build and include ESM files in `dist` build output folder
- Update README to reference compatible imports
- Update `package.json` to map CSM and ESM bundle for importing


```json
{
    // package.json
    // ...
    "exports": {
        ".": {
            "import": {
                "types": "./lib/esm/types/index.d.ts",
                "default": "./lib/esm/index.mjs"
            },
            "require": {
                "types": "./lib/cjs/types/index.d.ts",
                "default": "./lib/cjs/index.js"
            }
        }
    },
}
```