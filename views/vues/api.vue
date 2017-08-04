<template lang="pug">
div
	div.row
		div.col.s12.m12.l10.offset-l1(v-if="$store.state.autentificado")
			form(@submit.prevent = "subirQueja")
				h1.center-align Quéjate libremente
				textarea#queja.materialize-textarea(v-model="queja")
				input.btn.waves-effect.waves-light.orange.accent-4(type="submit" value="¡Quéjate!")
		div.col.s12.m12.l10.offset-l1.queja(v-for="queja in $store.state.quejas")
			router-link.enlace(:to="{ name: 'usuario', params: { usuario: queja.usuario } }")
				h5
					strong {{queja.nombre}} 
					| @{{queja.usuario}} dice:
			router-link.enlace(:to="{ name: 'queja', params: { id: queja.quejas._id } }")
				p {{queja.quejas.texto}}
				p.right-align {{queja.fechaHora | mostrarFecha}}
</template>

<script>
export default {
	data() {
		return { queja: "" };
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
	},
	created: function () {
		this.$store.commit("obtenerQuejas");
	},
	methods: {
		subirQueja() {
			this.$store.commit("subirQueja", this.queja);
			this.queja = "";
			this.$store.commit("obtenerQuejas");
		}
	}
}
</script>

<style>
textarea:focus{
    border-bottom: 1px solid #ff6d00 !important;
    box-shadow: 0 1px 0 0 #ff6d00 !important;
}
.queja{
    border-bottom: 1px solid #ff6d00;
}
a{
	color: black;
}
.enlace:hover{
	color: #ff6d00;
}
</style>
