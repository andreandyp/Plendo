//Dependencias para Vue
const Vue = require("vue"),
    Vuex = require("vuex"),
    VueRouter = require("vue-router"),
    VueResource = require("vue-resource"),
    $ = require("jquery");
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.devtools = false;
Vue.config.productionTip = false;

//Por alguna extraña razón, solo así sirve el Materialize.toast()
require('materialize');

//Componentes .vue
var inicio = require("./vues/inicio.vue"),
    api = require("./vues/api.vue"),
    autentificar = require("./vues/autentificar.vue"),
    usuario = require("./vues/usuario.vue"),
    queja = require("./vues/queja.vue"),
    pruebas = require("./vues/pruebas.vue");

//Estados y almacenamiento de Vuex
var store = new Vuex.Store(require("./store"));

//Rutas
var router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: api, name: "api" },
        { path: "/autentificar", component: autentificar, name: "autentificar" },
        { path: "/usuario/:usuario", component: usuario, name: "usuario" },
        { path: "/queja/:id", component: queja, name: "queja"},
        { path: "/pruebas", component: pruebas, name: pruebas }
    ]
});

//Instancia de Vue
new Vue({
    el: "#plendo",
    store,
    router,
    //Necesario para que se muestre
    render: createElement => createElement(inicio)
});

//Se tiene que renderizar el elemento (la función de arriba de Vue) antes de agregar esta propiedad
$(".button-collapse").sideNav({closeOnClick: true, menuWidth: 250});