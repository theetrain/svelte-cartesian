## Svelte 5 usage (experimental)

> [!WARNING]
> This component is based on the release candidate of Svelte 5 and is considered
> unstable. Any breaking changes will not be properly indicated in
> `svelte-cartesian` releases at this time, but there are no planned changes.

1. Install package

   ```bash
   npm install -D svelte-cartesian
   ```

2. Add component to your page.

   ```html
   <script>
     import Button from "./Button.svelte"
     import { CartesianWithRunes as Cartesian } from "svelte-cartesian"
   </script>

   <!-- define snippet possibilities -->
   {#snippet children()}
      Click me
   {/snippet}
   
   <!--
      Pass in prop and Snippet possibilities as an array of values.
   -->
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

### Styling `<CartesianWithRunes>`

Styling `<CartesianWithRunes>` is done in the exact same way as with [`<Cartesian>`](./README.md#styling-cartesian).

### `<CartesianWithRunes>` props

| prop            | type                            | description                                                                     |
| --------------- | ------------------------------- | ------------------------------------------------------------------------------- |
| `Component`     | `ComponentType`                 | **Required**: A Svelte component.                                               |
| `props`         | `Record<string, any[]>`         | **Required**: An object containing prop names and an array of potential values. |
| `unstyled`      | `?boolean=false`                | Disable built-in CSS.                                                           |
| `divAttributes` | `?SvelteHTMLElements["div"]={}` | Attributes to be spread onto the wrapping `<div>` element.                      |
