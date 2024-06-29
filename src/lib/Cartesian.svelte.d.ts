import type { ComponentType, SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from 'svelte/elements'

type RestProps = SvelteHTMLElements["div"]

interface Props {
  /** A Svelte component. */
  Component: ComponentType
  /** An object containing prop names and an array of potential values. */
  props: Record<string, any[]>
  /**
   * Renders the default slot's contents.
   * Each Cartesian's iteration will pass `innerProps` as slot props.
   * @default false
   */
  asChild?: boolean
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
  }
> {}
