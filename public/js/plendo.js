$(document).ready((jq) => {

    const router = new VueRouter({
        routes: [
            { path: "/", component: {
                template: "<div> <p v-if='cargando'>Cargando...</p> <div class='col-sm-4 col-sm-offset-4' v-for='queja in quejas' ><h3>(@{{queja.autor}}) dice:</h3><p>{{queja.texto}}</p><small>A las {{queja.fechaHora}}</small></div></div>",
                data: function(){
                    return {quejas: [], cargando: false}
                },
                beforeCreate: function(){
                    this.cargando = true;
                },
                created: function(){
                    this.$http.get('/api/quejas',).then( (response) =>{
                        this.quejas = response.body;
                    }, () => { console.log("Error en resource"); } );
                }              
            } }
            //{ path: "/autentificar", component: autentificar }
        ]
    });

    const app = new Vue({
        el: "#plendo",
        router: router
    })
});