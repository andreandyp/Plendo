<template lang="pug">
div
	router-link.enlace(:to="{ name: 'usuario', params: { usuario: this.usuario } }")
		h5
			strong {{ nombre }} 
			| @{{ usuario }} dice:
	router-link.enlace(:to="{ name: 'queja', params: { id: this.id } }")
		p {{texto}}
		p.right-align {{fechaHora | mostrarFecha}}
</template>

<script>
export default {
	props: ["nombre","usuario","texto","fechaHora", "id"],
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
