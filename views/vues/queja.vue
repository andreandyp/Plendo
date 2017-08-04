<template lang="pug">
div.row
	div.col.s12.m12.l10.offset-l1
		div.progress(v-if="this.$store.state.cargando")
		h5
			strong {{queja.nombre}} 
			| @{{queja.usuario}}
		div.queja
			p {{ queja.texto }}
			p.right-align {{queja.fechaHora | mostrarFecha}}
</template>

<script>
export default {
	data(){
		return { queja: {} }
	},
	created(){
		this.$store.state.cargando = true;
		this.$http.get("/quejas/"+this.$route.params.id).then(
		response => { 
			this.queja = response.body;
			//Es necesario sacar la queja del arreglo
			//Porque Vue se pone mamón al tratar de acceder a ella en los {{}}
			Object.assign(this.queja, this.queja.quejas[0]);
			delete this.queja.quejas;
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
