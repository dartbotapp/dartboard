<h1>&lt;dartbot-dartboard&gt; A Dartboard Web Component</h1>

![Dartboards rendered with different styles](https://raw.githubusercontent.com/dartbotapp/dartboard/refs/heads/main/storybook-public/board_themes.JPG)

<div>
  <a href="https://github.com/dartbotapp/dartboard" rel="noopener noreferrer" target="_blank"><img src="https://img.shields.io/badge/GitHub-Code-232323.svg?style=flat&amp;logo=github&amp;logoColor=white" alt="GitHub" /></a>
  <a href="https://docs.dartbot.com" rel="noopener noreferrer" target="_blank"><img src="https://img.shields.io/badge/Docs-Website-232323.svg?style=flat" alt="Documentation" /></a>
  <a href="https://www.npmjs.com/package/@dartbot/dartboard" rel="noopener noreferrer" target="_blank"><img src="https://img.shields.io/npm/dw/@dartbot/dartboard?label=npm&amp;style=flat" alt="npm" /></a>
  <a href="https://github.com/dartbotapp/dartboard/actions/workflows/publish.yml" rel="noopener noreferrer" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/dartbotapp/dartboard/publish.yml" alt="GitHub Actions Workflow Status" /></a>
  <a href="https://github.com/dartbotapp/dartboard/blob/main/LICENSE" rel="noopener noreferrer" target="_blank"><img src="https://img.shields.io/badge/license-MIT-232323.svg?style=flat" alt="License" /></a>
</div>

---

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

<h3><a href="https://docs.dartbot.com"><img style="width:.9em;margin-right:.2em" src="https://raw.githubusercontent.com/dartbotapp/dartboard/refs/heads/main/storybook-public/storybook.svg">Storybook Documentation</</a></h3>

- **Demo** - For a <a href="https://docs.darbot.com">live demo</a> visit the Storybook docs</a>
- <a href="https://medium.com/p/0fee96256bf4">Tutorial and walkthrough</a> on Medium

## Design Goals

🎨 **HTML Canvas** Render using HTMLCanvas

🍦 **Vanilla Web Component** Export as a dependency-free vanilla web component, usable with just HTML, CSS, and JS

#️⃣ **Typescript** Written in Typescript

🌈 **Styles** Offer fully customizable styling. Where possible use CSS to control customized settings

🧾 **Support CSS props** CSS properties like padding, margin, filters, etc., should affect the element as expected

🔎 **Pan & Zoom** Support ability to zoom in and change center point of the board

🌐 **Accessibility** Implement accessibility recommendations. WCAG, WAI-ARIA

🕹️ **Interactivity** Support user interactivity features including touch input, hover, selection, highlighting, and clicking.

## Installation

```bash
npm i @dartbot/dartboard
```

## Usage

```html
<script type="module">
  import '@dartbot/dartboard/dartbot-dartboard.js';
</script>

<dartbot-dartboard></dartbot-dartboard>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`



## ToDo
- [x] Styles
  - [x] Customize w/ CSS
  - [x] Show wire
  - [x] Wire shadow
  - [x] Wire blur
  - [x] Wire offset
  - [x] Wire overhang
  - [x] Wire inset
  - [x] Show numbers
- [x] Support standard CSS props
  - [x] Padding
  - [x] Margin
  - [x] Filters
  - [x] Transformations
  - [x] Zoom
- [x] Resize
- [x] Hits
- [x] Alt board setups
- [ ] Events
  - [ ] Hover
  - [x] Click
  - [ ] Select
  - [ ] Drag
  - [ ] Touch
- [ ] Pan and Zoom
  - [ ] Props
  - [ ] Mouse
- [x] NPM publish
- [x] Build badges
- [ ] Accesibility
- [ ] Performance
- [ ] Export as image
- [ ] Unit tests
- [ ] Rotate board to match pi
- [ ] Demo pages