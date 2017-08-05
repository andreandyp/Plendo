<template lang="pug">
div
	h1 Sitio de pruebas
	div(v-for="queja in quejas")
		cosa-comp(:nombre="queja.nombre", :usuario="queja.usuario")
</template>

<script>
export default {
	data(){
		return { 
			quejas: [
				{nombre: "Andy", usuario: "AndreAndyP"},
				{nombre: "Gisela", usuario: "Gis"}
				] 
			}
	},
	components: {
		"cosa-comp": require("./cosa.vue")
	}
}
</script>

