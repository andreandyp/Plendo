<template lang="pug">

div
	div.navbar-fixed
		nav.orange.accent-4
			div.nav-wrapper
				ul.left.hide-on-med-and-down
					li
						router-link(:to="{ name: 'acercaDe' }") Acerca de
				a.brand-logo.center(href="/") Plendo
				ul.right.hide-on-med-and-down
					li(v-if="$store.state.autentificado")
						router-link(:to="{ name: 'usuario', params: {usuario: $store.state.usuario.usuario } }" v-once) Hola {{ $store.state.usuario.nombre }}
					li(v-if="$store.state.autentificado")
						a(href="/" v-on:click="salir") Salir
					li(v-else)
						router-link(:to="{ name: 'autentificar' }") Únete a Plendo
				a.button-collapse(href="#", data-activates="lateral")
					i.material-icons menu
	ul#lateral.side-nav
		li(v-if="$store.state.autentificado")
			div.user-view
				router-link(:to="{ name: 'usuario', params: {usuario: $store.state.usuario.usuario } }" v-once)
					span.black-text.name 
					| Hola {{ $store.state.usuario.nombre }}
		li(v-if="$store.state.autentificado")
			a(href="#" v-on:click="salir") Salir
		li(v-else)
			router-link(:to="{ name: 'autentificar' }")
				i.material-icons perm_identity
				| Únete a Plendo
		li
			router-link(:to="{ name: 'acercaDe' }") Acerca de
	div.progress(v-if="$store.state.cargando")
		div.indeterminate.orange.accent-4
	router-view

</template>

<script>
export default {
	created () {
		this.$store.commit("verificar");
	},
	methods: {
		salir() {
            this.$store.commit("salir");
        }
	}
}
</script>

<style scoped>
.progress{
    background-color: #ffe0b2;
}
</style>
