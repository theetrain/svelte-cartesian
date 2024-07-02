<script>
  import Cartesian from "$main-lib/CartesianWithRunes.svelte"
  import Button from "$lib/Button.svelte"

  const props = {
    props: {
      size: ["small", "medium", "large"],
      variant: ["primary", "secondary"],
      children: [children],
      leftSnippet: [undefined, leftSnippet],
      rightSnippet: [undefined, rightSnippet],
    },
    Component: Button,
  }
</script>

{#snippet children()}
  Make popcorn
{/snippet}
{#snippet leftSnippet()}
  Left stuff
{/snippet}
{#snippet rightSnippet()}
  Right stuff
{/snippet}

<Cartesian {...props}></Cartesian>
