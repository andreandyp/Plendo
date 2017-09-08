<template lang="pug">
div
	div.row
		div.col.s12.m12.l10.offset-l1(v-if="$store.state.autentificado")
			form(@submit.prevent = "subirQueja")
				h1.center-align Quéjate libremente
				textarea#queja.materialize-textarea(v-model="queja")
				input.btn.waves-effect.waves-light.orange.accent-4(type="submit" value="¡Quéjate!")
			div.col.s12.m12.l5
		div.col.s12.m12.l10.offset-l1
			queja-comp(v-for="queja in quejas" :nombre="queja.nombre", :usuario="queja.usuario", :id="queja.quejas._id", :texto="queja.quejas.texto", :fechaHora="queja.quejas.fechaHora")
</template>

<script>
export default {
	data() {
		return { queja: "", quejas: [] };
	},
	components: {
		"queja-comp": require("./queja-comp.vue")
	},
	beforeMount(){
		this.obtenerQuejas();		
	},
	methods: {
		subirQueja() {
            this.$http.post("/quejas", { autor: this.$store.state.usuario.usuario, texto: this.queja }).then(
            response =>  { Materialize.toast("Queja subida", 3000) },
            response => Materialize.toast(response.body.error, 3000) );
			this.queja = "";
			this.obtenerQuejas();
		},
		obtenerQuejas() {
			this.$store.state.cargando = true;
			this.$http.get('/quejas').then(
			response => {
				this.quejas = response.body;
				this.$store.state.cargando = false;
			},
			response => {
				Materialize.toast(response.body.error, 3000);
				this.$store.state.cargando = false;
			});
		}
	}
}
</script>

<style scoped>
textarea:focus {
	border-bottom: 1px solid #ff6d00 !important;
	box-shadow: 0 1px 0 0 #ff6d00 !important;
}
</style>
