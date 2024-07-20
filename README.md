# Svelte Cartesian

A single component that helps render prop combinations (the "Cartesian
Product") for visual regression testing.

<img src="https://raw.githubusercontent.com/theetrain/svelte-cartesian/main/demo.jpg" alt="Cartesian demonstration featuring a 4 x 3 x 2 combination." />

- [Why](#why)
  - [Before using `svelte-cartesian`](#before-using-svelte-cartesian)
  - [After using `svelte-cartesian`](#after-using-svelte-cartesian)
- [Svelte 4 usage](#svelte-4-usage)
  - [Basic usage (Svelte 4)](#basic-usage-svelte-4)
  - [Usage with slots (Svelte 4)](#usage-with-slots-svelte-4)
  - [Adding labels (Svelte 4)](#adding-labels-svelte-4)
  - [Styling `<Cartesian>` (Svelte 4)](#styling-cartesian-svelte-4)
  - [`<Cartesian>` props (Svelte 4)](#cartesian-props-svelte-4)
  - [`<Cartesian>` slots (Svelte 4)](#cartesian-slots-svelte-4)
  - [Examples (Svelte 4)](#examples-svelte-4)
- [Svelte 5 usage (experimental)](#svelte-5-usage-experimental)
  - [Styling `<CartesianWithRunes>` (Svelte 5)](#styling-cartesianwithrunes-svelte-5)
  - [`<CartesianWithRunes>` props (Svelte 5)](#cartesianwithrunes-props-svelte-5)
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

<details>
<summary>Before and after using <code>svelte-cartesian</code></summary>

### Before using `svelte-cartesian`

```html
<script>
  import { Button } from './Button.svelte'
</script>

<!-- This nests deeper with every additional prop -->
{#each ['primary', 'secondary'] as variant}
  {#each ['small', 'medium', 'large'] as size}
    {#each ['main', 'common', 'ghost'] as prominence}
      <Button {size} {variant} {prominence}>
        Dispense popcorn
      </Button>
    {/each}
  {/each}
{/each}
```

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

</details>

## Svelte 4 usage

1. Install package

    ```bash
    npm install -D svelte-cartesian
    ```

2. Add component to your page.

    ```html
    <script>
      import { Cartesian } from 'svelte-cartesian'
    </script>
    ```

3. Pass props with array of potential values, including an explicit `undefined`
   where applicable.

### Basic usage (Svelte 4)

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

### Usage with slots (Svelte 4)

- Pass your component into the default slot.
- Spread the `innerProps` slot prop to your component, which will render a
  single prop combination at every iteration.
- This is used to manually define named slot combinations for your provided
  component.

```html
<script>
  import Button from './Button.svelte'
  import { Cartesian } from 'svelte-cartesian'

  const props = {
    Component: Button,
    props: {
      variant: ['primary', 'secondary'],
      size: ['medium', 'large']
    }
  }
</script>

<!-- Left slot + default slot -->
<Cartesian {...props} let:innerProps>
  <Button {...innerProps}>
    <svelte:fragment slot="left">
      Left contents
    </svelte:fragment>
    Click me
  </Button>
</Cartesian>

<!-- Default slot on its own -->
<Cartesian {...props} let:innerProps>
  <Button {...innerProps}>
    Click me
  </Button>
</Cartesian>
```

### Adding labels (Svelte 4)

Use the `labels` prop to generate labels next to every component instance.

```html
    <Cartesian
      props={props}
      Component={Component}
      labels />
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
<Cartesian
  props={props}
  Component={Component}
  labels
>
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
<Cartesian
  props={props}
  Component={Component}
>
  <div class="label-container" slot="label" let:innerProps>
    <span class="label">Props</span>
    <pre class="props">{customLabel(innerProps)}</pre>
  </div>
</Cartesian>
```

### Styling `<Cartesian>` (Svelte 4)

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

### `<Cartesian>` props (Svelte 4)

| prop             | type                                                                            | description                                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Component`      | `ComponentType`                                                                 | **Required**: A Svelte component.                                                                                                                                                                 |
| `props`          | `Record<string, any[]>`                                                         | **Required**: An object containing prop names and an array of potential values.                                                                                                                   |
| `asChild`        | `?boolean=false`                                                                | Renders the default slot's contents. Each Cartesian's iteration will pass `innerProps` as slot props. Default value `false`. See [usage with slots](#usage-with-slots-svelte-4) for more details. |
| `labels`         | `?(undefined \| boolean \| 'short' \| 'long' \| 'long-with-objects')=undefined` | Generate labels under every iteration. See [adding labels](#adding-labels-svelte-4) for detailed usage.                                                                                           |
| `unstyled`       | `?boolean=false`                                                                | Disable built-in CSS.                                                                                                                                                                             |
| `divAttributes`  | `?SvelteHTMLElements["div"]={}`                                                 | Attributes to be spread onto the wrapping `<div>` element.                                                                                                                                        |
| `let:innerProps` | `Record<string, any>`                                                           | Provides a single combination of props at every iteration to the *default* slot. Use this alongside `asChild` to spread `innerProps` to your nested component.                                    |
| `let:label`      | `string`                                                                        | Generated label for a given instance. This is provided to the `label` slot. See [adding labels](#adding-labels-svelte-4) for more details.                                                        |

### `<Cartesian>` slots (Svelte 4)

| slot name | slot props                    | description                                                                                                                                                                                                                              |
| --------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *default* | `let:innerProps`              | Default slot. Contents get passed to provided `Component`. When `asChild` is set to `true`, contents **MAY** contain provided `Component` and its respective slots; see [usage with slots](#usage-with-slots-svelte-4) for more details. |
| `label`   | `let:label`, `let:innerProps` | Provide your own label, styles, and logic instead of the default provided label.                                                                                                                                                         |

### Examples (Svelte 4)

See more examples in [end to end tests](./e2e/svelte-4/src/routes/).

## Svelte 5 usage (experimental)

>[!WARNING]
>This component is based on the release candidate of Svelte 5 and is considered
>unstable. Any breaking changes will not be properly indicated in
>`svelte-cartesian` releases at this time, but there are no planned changes.

1. Install package

    ```bash
    npm install -D svelte-cartesian
    ```

2. Add component to your page.

    ```html
    <script>
      import Button from './Button.svelte'
      import { CartesianWithRunes as Cartesian } from 'svelte-cartesian'
    </script>

    {#snippet children()}
      Click me
    {/snippet}

    <Cartesian
      Component={Button}
      props={{
        variant: ['primary', 'secondary'],
        size: ['medium', 'large'],
        children: [children]
      }}
    />
    ```

3. Pass props with array of potential values, including an explicit `undefined`
   where applicable. Ensure snippets are passed in as props and defined within
   the markup of the page using `<CartesianWithRunes>`.

### Styling `<CartesianWithRunes>` (Svelte 5)

Styling `<CartesianWithRunes>` is done in the exact same way as with [`<Cartesian>`](#styling-cartesian-svelte-4).

### `<CartesianWithRunes>` props (Svelte 5)

| prop            | type                            | description                                                                     |
| --------------- | ------------------------------- | ------------------------------------------------------------------------------- |
| `Component`     | `ComponentType`                 | **Required**: A Svelte component.                                               |
| `props`         | `Record<string, any[]>`         | **Required**: An object containing prop names and an array of potential values. |
| `unstyled`      | `?boolean=false`                | Disable built-in CSS.                                                           |
| `divAttributes` | `?SvelteHTMLElements["div"]={}` | Attributes to be spread onto the wrapping `<div>` element.                      |

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
