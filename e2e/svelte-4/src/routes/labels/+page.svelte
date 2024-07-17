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
</script>

<h1>Labelled Cartesian</h1>

<h2>Short - explicit</h2>

<Cartesian {...props} labels="short">Make popcorn</Cartesian>

<h2>Short - implicit</h2>

<Cartesian {...props} labels>Make popcorn</Cartesian>

<h2>Long</h2>

<Cartesian {...props} labels="long">Make popcorn</Cartesian>

<h2>Long with objects</h2>

<Cartesian {...props} labels="long-with-objects">Make popcorn</Cartesian>
