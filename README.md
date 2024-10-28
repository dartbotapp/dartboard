<h1 align="center">&lt;dartbot-dartboard&gt; A Dartboard Web Component</h1>


![Dartboards rendered with different styles](https://github.com/dartbotapp/dartboard/blob/main/storybook-public/board_themes.jpg?raw=true)

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

# Design Goals

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

---

Documentation: [docs.dartbot.com](https://docs.dartbot.com)

Source: [github.com/dartbotapp/dartboard](https://github.com/dartbotapp/dartboard)

---


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
* Hits✅
* Alt board setups✅
* Events
  * hover
  * click
  * select
  * drag
  * touch
* Pan and Zoom
  * props
  * mouse
* Npm build and publish
* Unit tests
* Build badges
* Rotate board to match pi
* Demo pages