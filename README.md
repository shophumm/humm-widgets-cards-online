# humm-widgets-cards-online

## Development

### Quick start

If you already have a JavaScript / TypeScript based development environment, you will need to [install node 14](https://nodejs.org/en/download/) and [yarn for dependency management](https://yarnpkg.com/lang/en/docs/install/#mac-stable) on your device. Node 14 is used on all dev devices and on all infrastructure.

- [nvm is recommended for managing different node versions.](https://github.com/nvm-sh/nvm)
- [iTerm2 is recommended to manage all the terminal windows.](https://www.iterm2.com/)
- [VSCode is the recommended IDE for this code base.](https://code.visualstudio.com/)
- [The Vetur VSCode extension is recommended for working with Vue](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### Code Style

We use prettier for code style. This is highly opinionated and reduces or removes any need to discuss styles.

### A thing or two about .env files

To get started with development, add a `.env` file in the root of this project. Add the keys in the provided `.env.template`, and ask the development team for any secret values thay you may have to add.

1. Use .env files in the root directory for environment variables and secrets. (e.g .env.production, .env.development)
2. Follow the .env.template standard when naming.
3. The .env.template file may contain: a) non-secret keys and values. b) keys only for secrets. The .env.template can be committed.
4. Do not commit other .env files to Github since these values should be kept secure
5. Please use LastPass or an equivalent tool to save and share these .env variable values with your team

### Overview

The code base is designed to be bundled into two separate libraries: one for Australia and one for New Zealand.
This is to only bundle the necessary files and dependencies for each region to reduce the production bundle size as much as possible.
Building the project into a library instead of a standard web app means that the individual Javascript files per region will include Vue, scripts, styles and everything that is needed to only load the Javascript file to embed the app. Furthermore, the Javascript file will handle the creation of a DOM node adjacent to the script tag that will be used for mounting the app.

### Scripts

See `package.json` for more details.

**Installing dependencies**

```sh
yarn
```

**Starting the project**

Runs the app in the development mode. Starts the Australian widget by default
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

```sh
yarn start
```

For more granular control of region-specific build targets use the following commands:

```sh
start:au
```

```sh
start:nz
```

**Building**

Compiles and minifies two library packages for production.
Use `build/index.html` to test production builds, or see **Build preview** below.
[Read more about library build targets](https://cli.vuejs.org/guide/build-targets.html#library)

```sh
yarn build
```

**Build preview**
Does a production build as above and serves `build/index.html` to be previewed.
Note that `public/demo.html` is renamed and copied to `build/index.html` on production build.
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

```sh
yarn preview
```

**Linting**

Lint CSS and scripts.

```sh
yarn lint
```

**Performance**

Compress SVG's in `src/assets/images` with SVGO.
If you have sub directories the targets in the script can be changed to `src/assets/images/**/*.svg`
Note that this fails if you don't have sub directories. By default this commend will compress already compressed SVG's on subsequent runs.

```sh
yarn perf:svg
```

Inspect a production build in `build/` with `source-map-explorer` to inspect your production bundle.
Great for debugging code-splitting. Remember to run `yarn build` first.

```sh
yarn perf:build
```

**Storybook**
[See Storybook section](#storybook)

Start Storybook

```sh
yarn storybook
```

Storybook production build

```sh
yarn build-storybook
```

## Main stack

- [Vue 3](https://vuejs.org/)

## Customize Vue configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Example Folder Structure

    ├── ...
    ├── build                       # Target build folder
    ├── public                      # Override index.html, demo.html
    ├── src
    │   ├── assets                  # Images, videos, etc. that are imported by the components
    │   ├── components              # App components
    │   │   ├── dataDisplay         # Avatars, Badges, Tables
    │   │   ├── layout              # Containers, Grids
    │   │   └── navigation          # Links, Drawers, Tabs, Steppers
    │   ├── models                  # FE Models, types and enums
    │   ├── styles                  # Theme and global styles
    │   └── utils                   # Helper functions and constants
    │
    ├── .env.{environment}          # Environment specific variables
    └── ...

## Storybook

This project uses Storybook to help us develop and test components.
A Storybook is a collection of stories. Each story represents a single visual state of a component.

[Read more about Storybook](https://storybook.js.org/)

### Start Storybook

```sh
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

### Writing stories

Stories are kept on the same folder level as components.
To add a component to Storybook, create a new file, e.g: `ComponentName.stories.tsx`

```tsx
// ComponentName.stories.tsx
import { Story, Meta } from '@storybook/vue3'
import ComponentName, { ComponentNameProps } from 'path/to/ComponentName'

export default {
  title: 'Component Category/ComponentName',
  component: ComponentName,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    onClick: {},
  },
} as Meta

const Template: Story<ComponentNameProps> = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ComponentName },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<ComponentName v-bind="args">This is a component</ComponentName>',
})

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
}
```

Refer to the [Storybook Docs](https://storybook.js.org/docs/basics/introduction/) and [Learn Storybook](https://www.learnstorybook.com/) for more information.
