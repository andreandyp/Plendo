<template lang="pug">
div
	div.row
		div.col.s12.m12.l4
			form(v-on:submit.prevent="registrar")
				h3.center-align Registrate
				div.input-field
					input#n-nombre.form-control(type="text" v-model="nuevo.nombre")
					label(for="n-nombre") Nombre
				div.input-field
					input#n-usuario.form-control(type="text" v-model="nuevo.usuario")
					label(for="n-usuario") Usuario
				div.input-field
					input#n-contrasena.form-control(type="password" v-model="nuevo.contraseña")
					label(for="n-contrasena") Contraseña
				input.btn.waves-effect.waves-light.orange.accent-4(type="submit" value="Registrar")
		div.col.s12.m12.l4
			form(v-on:submit.prevent="iniciar")
				h3.center-align Inicia sesión
				div.input-field
					input#usuario.form-control(type="text" v-model="datos.usuario")
					label(for="usuario") Usuario
				div.input-field
					input#contrasena.form-control(type="password" v-model="datos.contraseña")
					label(for="contrasena") Contraseña
				input.btn.waves-effect.waves-light.orange.accent-4(type="submit" value="Iniciar")
		div.col.s12.m12.l4.center-align
			form
				h3 Ingresa via Twitter
				input.btn.waves-effect.waves-light.orange.accent-4(type="button" value="En construcción")
</template>

<script>
export default{
	data(){
		return { 
			nuevo: { nombre: "", usuario: "", contraseña: "" },
			datos: { usuario: "", contraseña: "" }
		}
	},
	created(){
	},
	methods: {
        registrar() {
			this.$store.commit("registrar", { nombre: this.nuevo.nombre, usuario: this.nuevo.usuario, contraseña: this.nuevo.contraseña });
        },
        iniciar() {
			this.$store.commit("iniciar", { usuario: this.datos.usuario, contraseña: this.datos.contraseña });
        }
    }
}
</script>

<style>
.input-field input:focus + label {
    color: #ff6d00 !important;
}
.input-field input:focus {
    border-bottom: 1px solid #ff6d00 !important;
    box-shadow: 0 1px 0 0 #ff6d00 !important;
}
</style>
