# \<dartbot-dartboard></dartbot-dartboard>
Dartboard web component


This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm install @dartbot/dartboard
```

## Usage

```html
<html>
  <head>
    <script type="module" src="[node_modules]/@dartbot/dartboard/index.js"></script>
  </head>
  <body>
    <dartbot-dartboard></dartbot-dartboard>
  </body>
</html>

```
## Run Locally with Storybook
```bash
npm run storybook
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

## Goals
* HTML component that renders an interactive dartboard
* Render using HTMLCanvas
* Exported as a vanilla web component with not dependencies, libraries, or frameworks
* Control styling via css as much as possible
* Implement accessibility recommendations
* Typescript
* Attributes, input props, events, mutation observer
* Auto resizing
* Touch input
* Interactivity (hover, select, highlight, click)










------------------------------------------------
## Design Goals

<dl>
  <dt>HTML Canvas</dt>
  <dd>Render using HTMLCanvas</dd>
  <dt>Vanilla Web Component</dt>
  <dd>Export as a dependency-free vanilla web component, usable with just HTML, CSS, and JS</dd>
  <dt>Typescript</dt>
  <dd>Written in Typescript</dd>
  <dt>Styles</dt>
  <dd>Offer fully customizable styling. Where possible use CSS to control customized settings</dd>
  <dt>Pan & Zoom</dt>
  <dd>Support ability to zoom in and change center point of the board</dd>
  <dt>Support CSS props</dt>
  <dd>CSS properties like padding, margin, filters, etc., should affect the element as expected</dd>
  <dt>Accessibility</dt>
  <dd>Implement accessibility recommendations. WCAG, WAI-ARIA</dd>
  <dt>Interactivity</dt>
  <dd>Support user interactivity features including touch input, hover, selection, highlighting, and clicking.</dd>
</dl>

# Features
* Styles
  * ✅ Customize styles via CSS
    * ✔️ Show wire
    * ✔️ Wire shadow
    * ✔️ Wire blur
    * ✔️ Wire offset
    * ✔️ Wire overhang
    * ✔️ Wire inset
    * ✔️ Show numbers
  * ✅ Support standard CSS props
    * ✔️ padding
    * ✔️ margin
    * ✔️ filters
    * ✔️ transformations
    * ✔️ zoom
  * ✅ Resize
* Hits
  * Hits
  * multiple styles
* Alt board setups
* Events
  * hover
  * click
  * select
  * drag
  * touch
* Pan and Zoom
  * props
  * mouse
* npm build and publish
* build badges
* Rotate board to match pi

<dartbot-dartboard style={{ 'max-height': '40em' }}></dartbot-dartboard>

### Installation
```bash
npm install @dartbot/dartboard
```
```html
<html>
  <head>
    <script type="module" src="[node_modules]/@dartbot/dartboard/index.js"></script>
  </head>
  <body>
    <dartbot-dartboard></dartbot-dartboard>
  </body>
</html>
```