const Vue = require("vue");
Vue.config.devtools = false;
Vue.config.productionTip = false;

var store = {
    //Almacenamiento global que comparten todos los componentes
    state: { quejas: [], usuario: { nombre: "", usuario: "" }, autentificado: false, cargando: false},
    //Todas las mutaciones que usan los componentes
    mutations: {
        obtenerQuejas(state) {
            state.cargando = true;
            Vue.http.get('/quejas').then(
            response => {
                state.quejas = response.body;
                state.cargando = false;
            }, response => Materialize.toast(response.body.error, 3000) );
        },
        subirQueja(state, queja) {
            Vue.http.post("/quejas", { autor: state.usuario.usuario, texto: queja }).then(
            response =>  { Materialize.toast("Queja subida", 3000) },
            response => Materialize.toast(response.body.error, 3000) );
        },
        registrar(state, datos){
            state.cargando = true;
            Vue.http.post("/autentificar/registrar", datos).then(
            response => {
                state.cargando = false;
                if (!response.body.error) {
                    state.usuario = response.body;
                    state.autentificado = true;
                    window.location.href = "/";
                } else {
                    Materialize.toast(response.body.error,3000);
                }
            }, response => Materialize.toast(response.body.error,3000) );
        },
        iniciar(state, credenciales){
            state.cargando = true;
            Vue.http.post("/autentificar/iniciar", credenciales).then(
            response => {
                state.cargando = false;
                if (!response.body.error) {
                    state.usuario = response.body;
                    state.autentificado = true;
                    window.location.href = "/";
                } else {
                    Materialize.toast(response.body.error,3000);
                }
            }, response => Materialize.toast(response.body.error,3000)  );
        },
        salir(state) {
            Vue.http.get("/autentificar/salir").then(
            response => {
                state.autentificado = false;
                state.usuario = {};
            }, response => Materialize.toast(response.body.error, 3000) );
        },
        verificar(state) {
            Vue.http.get("/autentificar/exito").then(
            response => {
                if (response.body.usuario != null) {
                    state.usuario = response.body.usuario;
                    state.autentificado = true;
                }
            }, response => Materialize.toast(response.body.error, 3000) );
        }
    }
};

module.exports = store;