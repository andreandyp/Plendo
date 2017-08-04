<template lang="pug">
div.row
	div.progress(v-if="this.$store.state.cargando")
	div.col.s12.m12.l5.offset-l1
		h3.center-align Información
		h5
			strong {{nombre}} 
			| @{{usuario}}
		p Fecha de creación: {{fechaHora | mostrarFecha}}
	div.col.s12.m12.l5
		h3.center-align Quejas
		div.queja(v-for="queja in quejas")
			router-link.enlace(:to="{ name: 'queja', params: { id: queja._id } }")
				p {{queja.texto}}
				p.right-align {{queja.fechaHora | mostrarFecha}}
</template>

<script>
require("vue-resource");
export default {
	data(){
		return { nombre: "", usuario: "", quejas: []}
	},
	created() {
		this.$store.state.cargando = true;
		this.$http.get("/usuarios/"+this.$route.params.usuario).then(
		response => {
			this.nombre = response.body[0].nombre;
			this.usuario = response.body[0].usuario;
			this.fechaHora = response.body[0].fechaHora;
			response.body.shift();
			for(let queja of response.body){
				this.quejas.push(queja.quejas);
			}
		},
		response => Materialize.toast(response.body, 3000)
		);
		this.$store.state.cargando = false;
	},
	filters: {
		mostrarFecha: (fecha) => {
			fecha = new Date(fecha);
			var fechaHora = [];
			fechaHora.push(fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate());
			fechaHora.push("/");
			fechaHora.push((fecha.getMonth() + 1) < 10 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1);
			fechaHora.push("/");
			fechaHora.push(fecha.getFullYear());
			fechaHora.push(" a las ");
			fechaHora.push(fecha.getHours());
			fechaHora.push(":");
			fechaHora.push(fecha.getMinutes() < 10 ? "0" + fecha.getMinutes() : fecha.getMinutes());
			return fechaHora.join("");
		}
	}
}
</script>