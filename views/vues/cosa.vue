<template lang="pug">
div
	p {{nombre}} y {{usuario}}
</template>

<script>
export default {
    props: ["nombre", "usuario"]
}
</script>
