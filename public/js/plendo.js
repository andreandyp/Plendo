$(document).ready((jq) => {

    
    const maquina = new Vuex.Store({
        state: { quejas: [], usuario: {nombre: "Andy", usuario: "Andy17"}, autentificado: false, cargando: false, queja: "" },
        mutations:{
            obtenerQuejas(state) {
                state.cargando = true;
                Vue.http.get('/api/quejas').then((response) => {
                    state.quejas = response.body.reverse();
                    state.cargando = false;
                }, () => { console.log("Error al cargar las quejas"); });
            },
            quejar(state,queja){
                state.queja = queja;
            },
            subirQueja(state) {
                Vue.http.post("/api/quejas", { autor: state.usuario.usuario, texto: state.queja }).then((response) => {
                    state.quejas.unshift(response.body);
                }, (response) => {
                    console.log("Error en la db");
                });
            },
            salir(state) {
                Vue.http.get("/autentificar/salir").then((response) => {
                    state.autentificado = false;
                    state.usuario = {};
                }, (response) => {
                    console.log("Error al salir");
                });
            },
            verificar(state) {
                Vue.http.get("/autentificar/exito").then((response) => {
                    if (response.body.usuario != null) {
                        state.autentificado = true;
                        state.usuario = response.body.usuario;
                    }
                }, (response) => {
                    console.log("Error al validar sesión");
                });
            }
        }
    });

    var api = {
        template: "#api",
        computed:{
            autentificado(){ return maquina.state.autentificado; },
            cargando() { return maquina.state.cargando; },
            queja:{ 
                get() { return maquina.state.queja; },
                set(valor) { maquina.commit("quejar",valor) }
            },
            quejas() { return maquina.state.quejas; }
        },
        filters: {
            mostrarFecha: (fecha) => {
                fecha = new Date(fecha);
                var fechaHora = [];
                fechaHora.push(fecha.getDate());
                fechaHora.push("/");
                fechaHora.push(fecha.getMonth() + 1);
                fechaHora.push("/");
                fechaHora.push(fecha.getFullYear());
                fechaHora.push(" a las ");
                fechaHora.push(fecha.getHours());
                fechaHora.push(":");
                fechaHora.push(fecha.getMinutes());
                return fechaHora.join("");
            }
        },
        created: function () {
            maquina.commit("obtenerQuejas");
        },
        methods: {
            subirQueja(){
                maquina.commit("subirQueja");
            }
        }
    };

    const router = new VueRouter({
        routes: [
            { path: "/", component: Vue.component("api",api) },
            //{ path: "/autentificar", component: Vue.component("autentificar",autentificar) }
        ]
    });

    const app = new Vue({
        el: "#plendo",
        router: router,
        computed: {
            autentificado(){ return maquina.state.autentificado; },
            nombre() { return maquina.state.usuario.nombre; }
        },
        /*mounted: function () {
            maquina.commit("verificar");
        },
        updated: function () {
            maquina.commit("verificar");
        },*/
        methods: {
            salir(){
                maquina.commit("salir");
            }
        }
    })
});