//Dependencias para Vue
const Vue = require("vue"),
    Vuex = require("vuex"),
    VueRouter = require("vue-router");
Vue.use(Vuex);
Vue.use(VueRouter);

//Componentes .vue
var inicio = require("./vues/inicio.vue"),
    api = require("./vues/api.vue");
    autentificar = require("./vues/autentificar.vue");

//Estados
var store = new Vuex.Store({
    state: { quejas: [], usuario: { nombre: "", usuario: "" }, autentificado: false, cargando: false},
    mutations: {
        registrar(state, datos){
            alert(datos);
        },
        iniciar(state, credenciales){
            alert(credenciales.usuario);
        }
    }
});

//Rutas
var router = new VueRouter({
    routes: [
        //{ path: "/", component: api },
        { path: "/autentificar", component: autentificar }
    ]
});

//Instancia de Vue
new Vue({
    el: "#plendo",
    store,
    router,
    components: {
        inicio
    },
    computed: {
        hue() { return "dfghjk" }
    },
    //Necesario para que se muestre
    render: createElement => createElement(inicio)
})