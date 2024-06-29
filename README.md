# Svelte Cartesian

A single component that helps render prop combinations (the "Cartesian
Product") for visual regression testing.

- [Svelte 4 usage](#svelte-4-usage)
  - [Basic usage (Svelte 4)](#basic-usage-svelte-4)
  - [Usage with slots (Svelte 4)](#usage-with-slots-svelte-4)
  - [Customizing `<Cartesian>` (Svelte 4)](#customizing-cartesian-svelte-4)
  - [`<Cartesian>` props (Svelte 4)](#cartesian-props-svelte-4)
- [Svelte 5 usage (experimental)](#svelte-5-usage-experimental)
- [Project roadmap](#project-roadmap)
  - [Goals](#goals)
  - [Non-goals](#non-goals)
- [Credits](#credits)

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
    variant=['primary', 'secondary'],
    size=['medium', 'large']
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

### Customizing `<Cartesian>` (Svelte 4)

`<Cartesian>` has these default CSS behaviours:

- Use CSS Grid with a `gap` of `1rem`.
- `padding` is set to `0.5rem 1rem` to allow consistent space when multiple
  `<Cartesian>` components are rendered one after the other.
- `grid-template-columns` is set to the
  number of values passed in your first `props` key, or `2` if `style` gets
  overridden.

There are a few ways to override its styles:

1. Via the `--columns` CSS variable; you may use Svelte `--style-props` or
   `style="--columns(3)"` to set a new value.
2. Use the `style` attribute that overrides the default `style` via
   `divAttributes`.
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

  --columns={4}
  style="background-color: green"
> <!-- customize style -->
</Cartesian>
```

### `<Cartesian>` props (Svelte 4)

| prop        | type                    | description                                                                                                                  |
| ----------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `Component` | `ComponentType`         | **Required**: A Svelte component.                                                                                            |
| `props`     | `Record<string, any[]>` | **Required**: An object containing prop names and an array of potential values.                                              |
| `asChild`   | `?boolean=false`        | Renders the default slot's contents. Each Cartesian's iteration will pass `innerProps` as slot props. Default value `false`. |
| `unstyled`   | `?boolean=false`        | Disable built-in CSS. |
| `divAttributes`   | `?SvelteHTMLElements["div"]={}`        | Any additional props will be spread onto the wrapping `<div>` element as attributes via `$$restProps`. |
| `let:innerProps`   | `Record<string, any>`        | Provides a single combination of props at every iteration. Use this alongside `asChild` to spread `innerProps` to your nested component. |

See more examples in [tests](./tests).

## Svelte 5 usage (experimental)

TBD.

## Project roadmap

### Goals

- Add deeper styling flexibility.
- Improve types.

### Non-goals

- Svelte 3 support
- Support other JS frameworks

## Credits

- [react-cartesian](https://github.com/codenameyau/react-cartesian)
- [Radix Svelte](https://github.com/radix-svelte/radix-svelte), and by extension
  [Radix UI](https://github.com/radix-ui)
