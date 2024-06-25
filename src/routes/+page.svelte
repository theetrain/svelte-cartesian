<script>
  import Cartesian from "$lib/Cartesian.svelte"
  import Button from "./Button.svelte"

  const props = {
    props: {
      size: ["small", "medium", "large"],
      variant: ["primary", "secondary"],
    },
    component: Button,
  }
</script>

<Cartesian {...props}>Create popcorn</Cartesian>
