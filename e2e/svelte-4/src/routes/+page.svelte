<script>
  import { Cartesian } from "svelte-cartesian"
  import Button from "$lib/Button.svelte"

  const props = {
    props: {
      size: ["small", "medium", "large"],
      variant: ["primary", "secondary"],
    },
    Component: Button,
  }
</script>

<Cartesian {...props}>Make popcorn</Cartesian>
