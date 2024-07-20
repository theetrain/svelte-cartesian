<script>
  import { Cartesian } from "svelte-cartesian"
  import Button from "$lib/Button.svelte"

  const props = {
    props: {
      size: ["small", "medium", "large"],
      variant: ["primary", "secondary"],
      disabled: [true, false],
      definitions: [{ animals: "a holistic group of species" }],
    },
    Component: Button,
  }

  /**
   * @param {Record<string, any>} innerProps
   */
  function customLabel(innerProps) {
    return Object.entries(innerProps)
      .map(([key, value]) => {
        let refinedValue = value

        if (typeof value === "object") {
          refinedValue = JSON.stringify(value)
        } else if (typeof value !== "string" && typeof value !== "number") {
          refinedValue = typeof value
        }

        return `${key}: ${refinedValue}`
      })
      .join("\n")
  }
</script>

<h2>Custom label, string value</h2>

<Cartesian {...props} labels="long-with-objects">
  Make popcorn
  <div class="label-container" slot="label" let:label>
    <span class="label">Props</span>
    <pre class="props">{label}</pre>
  </div>
</Cartesian>

<h2>Custom label, object value</h2>

<Cartesian {...props}>
  Make popcorn
  <div class="label-container" slot="label" let:innerProps>
    <span class="label">Props</span>
    <pre class="props">{customLabel(innerProps)}</pre>
  </div>
</Cartesian>

<style>
  .label-container {
    border: 1px solid black;
    border-radius: 3px;
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
  .label {
    font-size: 1.25rem;
    font-weight: 600;
  }
  .props {
    color: crimson;
  }
</style>
