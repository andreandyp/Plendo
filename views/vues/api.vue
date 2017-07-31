<template lang="pug">
div
	div.row
		div.col.s12.m12.l10.offset-l1(v-if="autentificado")
			form(@submit.prevent = "subirQueja")
				h1.center-align Quéjate libremente
				textarea#queja.materialize-textarea(v-model="queja")
				input.btn.waves-effect.waves-light.orange.accent-4(type="submit" value="¡Quéjate!")
		div.col.s12.m12.l10.offset-l1.queja(v-for="queja in quejas")
			h5
				strong {{queja.nombre}} 
				| @{{queja.usuario}} dice:
			p {{queja.quejas.texto}}
			p.right-align {{queja.quejas.fechaHora | mostrarFecha}}
</template>
