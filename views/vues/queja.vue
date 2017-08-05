<template lang="pug">
div.row
	div.col.s12.m12.l10.offset-l1
		queja-comp(:nombre="queja.nombre", :usuario="queja.usuario" , :texto="queja.texto", :fechaHora="queja.fechaHora")
</template>

<script>
export default {
	data() {
		return { queja: {}, hola: "hola" }
	},
	components: {
		"queja-comp": require("./queja-comp.vue")
	},
	created() {
		this.$store.state.cargando = true;
		this.$http.get("/quejas/" + this.$route.params.id).then(
			response => {
				this.queja = response.body;
				//Es necesario sacar la queja del arreglo
				//Porque Vue se pone mamón al tratar de acceder a ella en los {{}}
				Object.assign(this.queja, this.queja.quejas[0]);
				delete this.queja.quejas;
				this.$store.state.cargando = false;
			},
			response => { Materialize.toast(response.body, 3000); this.$store.state.cargando = false; }
		);
	}
}
</script>
