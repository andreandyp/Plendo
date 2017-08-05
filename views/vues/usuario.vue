<template lang="pug">
div.row
	div.col.s12.m12.l5.offset-l1
		h3.center-align Información
		h5
			strong {{nombre}} 
			| @{{usuario}}
		p Fecha de creación: {{fechaHora}}
	div.col.s12.m12.l5
		div(v-for="queja in quejas")
			queja-comp(:texto="queja.texto", :fechaHora="queja.fechaHora" :id="queja._id")
</template>

<script>
require("vue-resource");
export default {
	data(){
		return { nombre: "", usuario: "", quejas: []}
	},
	components:{
		"queja-comp": require("./queja-comp.vue")
	},
	created() {
		this.$store.state.cargando = true;
		this.$http.get("/usuarios/"+this.$route.params.usuario).then(
		response => {

			//El primer elemento de la respuesta son los datos del usuario
			//Se obtienen los datos del usuario y se saca del arreglo
			this.nombre = response.body[0].nombre;
			this.usuario = response.body[0].usuario;
			this.fechaHora = response.body[0].fechaHora;
			response.body.shift();

			//Se obtienen las quejas y se agregan a los datos del componente
			for(let queja of response.body){
				this.quejas.push(queja.quejas);
			}
			this.$store.state.cargando = false;
		},
		response => { Materialize.toast(response.body, 3000); this.$store.state.cargando = false; }
		);
	}
}
</script>