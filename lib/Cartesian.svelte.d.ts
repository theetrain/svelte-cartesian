import type { SvelteComponent } from "svelte"
import type { SvelteHTMLElements } from "svelte/elements"

type RestProps = SvelteHTMLElements["div"]

interface Props {
  /** A Svelte component. */
  Component: typeof import("svelte") extends { mount: any }
    ? import("svelte").ComponentType // Svelte 4 detected
    : import("svelte").Component // Svelte 5 detected
  /** An object containing prop names and an array of potential values. */
  props: Record<string, any[]>
  /**
   * Renders the default slot's contents.
   * Each Cartesian's iteration will pass `innerProps` as slot props.
   * @default false
   */
  asChild?: boolean
  /**
   * Generate labels under every iteration.
   *
   * - `'true'`: same as `'short'`.
   * - '`short'`: display comma-separated values, skip objects.
   * - '`long'`: display line-separated key-value pairs, represent object values
   * as their type name.
   * - '`long-with-objects'`: same as `'long'` but with full object definitions.
   * @type {undefined | boolean | 'short' | 'long' | 'long-with-objects'}
   * @default undefined
   */
  labels?: undefined | boolean | "short" | "long" | "long-with-objects"
  /**
   * Disable built-in CSS.
   * @default false
   */
  unstyled?: boolean
  /**
   * HTML attributes to pass to the wrapping `<div>`.
   * @default {{}}
   */
  divAttributes?: RestProps
}

/**
 * A single component that helps render prop combinations
 * (the "Cartesian Product") for visual regression testing.
 */
export default class Cartesian extends SvelteComponent<
  Props,
  {},
  {
    default: {
      // TODO: make this a generic and infer from Props.props
      /**
       * Provides a single combination of props at every iteration. Use this
       * alongside `asChild` to spread `innerProps` to your nested component.
       */
      innerProps: Record<string, any>
    }
    label: {
      /**
       * The generated label. Hint: use `<pre>` to render provided newline characters.
       */
      label: string
      /**
       * A single combination of props.
       */
      innerProps: Record<string, any>
    }
  }
> {}
