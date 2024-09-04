# Svelte Cartesian

A single component that helps render prop combinations. It can be used with visual regression test software such as [Playwright](https://playwright.dev/)
or [Storybook](https://storybook.js.org/) (see [examples](#examples)).

Its name comes from "Cartesian Product" in which an intersection of two
or more arrays form a matrix, such as:

```
[a, b] * [x, y] --> [[a, x], [a, y], [b, x], [b, y]]
```

<img src="https://raw.githubusercontent.com/theetrain/svelte-cartesian/main/demo.jpg" alt="Cartesian demonstration featuring a 4 x 3 x 2 combination." />

- [Why](#why)
  - [Before using `svelte-cartesian`](#before-using-svelte-cartesian)
  - [After using `svelte-cartesian`](#after-using-svelte-cartesian)
- [Setup](#setup)
- [Basic usage](#basic-usage)
- [Usage with slots](#usage-with-slots)
  - [Available slots](#available-slots)
- [Adding labels](#adding-labels)
- [Styling `<Cartesian>`](#styling-cartesian)
- [`<Cartesian>` props](#cartesian-props)
- [Examples](#examples)
  - [Usage with Playwright](#usage-with-playwright)
  - [Usage with Storybook](#usage-with-storybook)
- [Svelte 5 usage (experimental)](#svelte-5-usage-experimental)
- [Project roadmap](#project-roadmap)
  - [Goals](#goals)
  - [Non-goals](#non-goals)
- [Credits](#credits)

## Why

When building reusable components, testing them helps build confidence that
they'll work as expected in one or many consuming applications, and helps ensure
they remain stable as features are added. This includes, but is not limited to:

1. Type checking
2. Unit tests
3. Integration tests
4. Visual regression tests
5. End to end tests

At various stages of a UI library's maturity, different levels of test coverage
become more necessary as the library matures.

`svelte-cartesian` helps with point 4: Visual regression tests. Today, rendering
many combinations of a component requires nested `{#each}` loops and some style
boilerplate. `svelte-cartesian` solves this in one component that accepts prop
values you wish to test, and then renders prop combinations.

### Before using `svelte-cartesian`

<!-- prettier-ignore-start -->
```html
<script>
  import { Button } from "./Button.svelte"
</script>

<!-- This nests deeper with every additional prop -->
{#each ['primary', 'secondary'] as variant}
  {#each ['small', 'medium', 'large'] as size}
    {#each ['main', 'common', 'ghost'] as prominence}
      <button {size} {variant} {prominence}>
        Dispense popcorn
      </button>
    {/each}
  {/each}
{/each}
```
<!-- prettier-ignore-end -->

### After using `svelte-cartesian`

```html
<script>
  import { Cartesian } from 'svelte-cartesian'
  import { Button } from './Button.svelte'
</script>

<Cartesian
  Component={Button}
  props={{
    variant: ['primary', 'secondary'],
    size: ['small', 'medium', 'large'],
    prominence: ['main', 'common', 'ghost']
  }}
>
  Dispense popcorn
</Cartesian>
```

## Setup

1. Install package

   ```bash
   npm install -D svelte-cartesian
   ```

2. Add component to your page.

   ```html
   <script>
     import { Cartesian } from "svelte-cartesian"
   </script>
   ```

3. Pass props with array of potential values, including an explicit `undefined`
   where applicable.

## Basic usage

- Pass a component to the `Component` prop.
- Pass an object to `props` containing possible prop keys for your passed-in
  component, with each prop key containing an array of potential values.

```html
<script>
  import Button from './Button.svelte'
  import { Cartesian } from 'svelte-cartesian'
</script>

<Cartesian
  Component={Button}
  props={{
    variant: ['primary', 'secondary'],
    size: ['medium', 'large']
  }}
>
  Click me
</Cartesian>
```

## Usage with slots

- Pass your component into the default slot.
- Spread the `innerProps` slot prop to your component, which will render a
  single prop combination at every iteration.
- This is used to manually define named slot combinations for your provided
  component.

```html
<script>
  import Button from "./Button.svelte"
  import { Cartesian } from "svelte-cartesian"

  const props = {
    Component: Button,
    props: {
      variant: ["primary", "secondary"],
      size: ["medium", "large"],
    },
  }
</script>

<!-- Left slot + default slot -->
<Cartesian {...props} let:innerProps>
  <button {...innerProps}>
    <svelte:fragment slot="left"> Left contents </svelte:fragment>
    Click me
  </button>
</Cartesian>

<!-- Default slot on its own -->
<Cartesian {...props} let:innerProps>
  <button {...innerProps}>Click me</button>
</Cartesian>
```

### Available slots

| slot name | slot props                    | description                                                                                                                                                                                                                              |
| --------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _default_ | `let:innerProps`              | Default slot. Contents get passed to provided `Component`. When `asChild` is set to `true`, contents **MAY** contain provided `Component` and its respective slots; see [usage with slots](#usage-with-slots-svelte-4) for more details. |
| `label`   | `let:label`, `let:innerProps` | Provide your own label, styles, and logic instead of the default provided label.                                                                                                                                                         |

## Adding labels

Use the `labels` prop to generate labels next to every component instance.

```html
<Cartesian props="{props}" Component="{Component}" labels />
<!--  ^^^^^^ implied as `true` -->
```

Allowed values for the `labels` prop:

- `true`: same as `'short'`.
- `'short'`: display comma-separated values, skip objects.
- `'long'`: display line-separated key-value pairs, represent object values as their type name.
- `'long-with-objects'`: same as `'long'`, but with full object definitions.

Default labelling behaviour can be overridden with the `label` slot.

```html
<!-- Using `label` slot prop -->
<Cartesian props="{props}" Component="{Component}" labels>
  <div class="label-container" slot="label" let:label>
    <span class="label">Props</span>
    <pre class="props">{label}</pre>
  </div>
</Cartesian>

<!--
  Using `innerProps` slot prop.

  Note: `label` prop isn't required when
  using `innerProps` to render labels.
-->
<Cartesian props="{props}" Component="{Component}">
  <div class="label-container" slot="label" let:innerProps>
    <span class="label">Props</span>
    <pre class="props">{customLabel(innerProps)}</pre>
  </div>
</Cartesian>
```

## Styling `<Cartesian>`

`<Cartesian>` has these default CSS behaviours:

- Use CSS Grid with a `gap` of `1rem`.
- `padding` is set to `0.5rem 1rem` to allow consistent space when multiple
  `<Cartesian>` components are rendered one after the other.
- `grid-template-columns` is set to `var(--columns, repeat(2, 1fr))` for a
  default 2-column grid overridable with the `--columns` CSS variable.

There are a few ways to override its styles:

1. Via the `--columns` CSS variable; you may use Svelte `--style-props` or
   `style="--columns: repeat(3, 1fr)"` to set a new value.
2. Use the `style` attribute that overrides the default `style` via
   `divAttributes`. The same technique can be applied to your own passed-in
   components so long as it accepts `style` via `$$restProps` or [pass-through props](https://svelte.dev/repl/f6c1779a4b924686af69a4e9def81621?version=4.2.18).
3. Pass in global class names to the `class` attribute that gets passed in via `divAttributes`.
4. Wrap `<Cartesian>` with your own element and styles, and set the `unstyled`
   prop to `true`.

```html
<script>
  import { Cartesian } from 'svelte-cartesian'
  import Button from './Button.svelte'
</script>

<Cartesian
  Component={Button}
  props={{
    size: ['small', 'medium'],
    variant: ['primary', 'secondary']
  }}

  --columns="repeat(4, 1fr)"
  style="background-color: green"
> <!-- customize style -->
</Cartesian>
```

## `<Cartesian>` props

| prop             | type                                                                            | description                                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Component`      | `ComponentType`                                                                 | **Required**: A Svelte component.                                                                                                                                                                 |
| `props`          | `Record<string, any[]>`                                                         | **Required**: An object containing prop names and an array of potential values.                                                                                                                   |
| `asChild`        | `?boolean=false`                                                                | Renders the default slot's contents. Each Cartesian's iteration will pass `innerProps` as slot props. Default value `false`. See [usage with slots](#usage-with-slots-svelte-4) for more details. |
| `labels`         | `?(undefined \| boolean \| 'short' \| 'long' \| 'long-with-objects')=undefined` | Generate labels under every iteration. See [adding labels](#adding-labels-svelte-4) for detailed usage.                                                                                           |
| `unstyled`       | `?boolean=false`                                                                | Disable built-in CSS.                                                                                                                                                                             |
| `divAttributes`  | `?SvelteHTMLElements["div"]={}`                                                 | Attributes to be spread onto the wrapping `<div>` element.                                                                                                                                        |
| `let:innerProps` | `Record<string, any>`                                                           | Provides a single combination of props at every iteration to the _default_ slot. Use this alongside `asChild` to spread `innerProps` to your nested component.                                    |
| `let:label`      | `string`                                                                        | Generated label for a given instance. This is provided to the `label` slot. See [adding labels](#adding-labels-svelte-4) for more details.                                                        |

## Examples

### Usage with Playwright

1. Create a page using `<Cartesian />`
2. Set up a test to take a screenshot of your page.

```js
test("default slot", async ({ page }) => {
  await page.goto("localhost:4173/")
  await expect(page).toHaveScreenshot()
})
```

See complete Playwright examples in [end to end
tests](./e2e/svelte-4/src/routes/).

### Usage with Storybook

1. Set up a component story.
2. Import `<Cartesian />` to render prop combinations:

```html
<script context="module">
  import { Story, Template } from "@storybook/addon-svelte-csf"
  import { Cartesian } from "svelte-cartesian"
  import Switch from "./Switch.svelte"

  export const meta = {
    title: "Switch",
    component: Switch,
    tags: ["autodocs"],
  }
  const props = {
    label: ["Active profile"],
    size: ["sm", "md"],
    toggle: ["on", "off"],
    buttonAttributes: [{ disabled: true }, { disabled: false }],
  }
</script>

<!-- Basic Cartesian usage -->
<template>
  <Cartesian {props} Component="{Switch}" />
</template>

<Story name="Switches" />

<!--
  Optional, but recommended to test states
-->
<Story name="Switches Pressed" parameters={{ pseudo: { active: true } }} />
<Story name="Switches Focused" parameters={{ pseudo: { focusVisible: true } }}
/>
```

See
[storybook-addon-pseudo-states](https://github.com/chromaui/storybook-addon-pseudo-states)
for more inspiration.

## Svelte 5 usage (experimental)

See [Svelte 5 README](./README-svelte-5.md).

## Project roadmap

### Goals

- Add deeper styling flexibility.
- Improve types.

### Non-goals

- Svelte 3 support.
- Support other JS frameworks; though I may export [`getCartesianProduct()`](./lib/cartesian.js) upon request.

## Credits

- [react-cartesian](https://github.com/codenameyau/react-cartesian)
- [Radix Svelte](https://github.com/radix-svelte/radix-svelte), and by extension
  [Radix UI](https://github.com/radix-ui)
