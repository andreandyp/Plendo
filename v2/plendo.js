$(document).ready(function (jq) {
    //Estados y transiciones    
    var maquina = new Vuex.Store({
        state: { quejas: [], usuario: { nombre: "", usuario: "" }, autentificado: false, cargando: false },
        mutations: {
            obtenerQuejas(state) {
                state.cargando = true;
                Vue.http.get('/api/quejas').then((response) => {
                    console.log(response.body);
                    state.quejas = response.body;
                    state.cargando = false;
                }, (response) => { Materialize.toast(response.body.error,3000); });
            },
            subirQueja(state,queja) {
                Vue.http.post("/api/quejas", { autor: state.usuario.usuario, texto: queja }).then((response) => {
                    Materialize.toast("Queja subida", 3000);
                }, (response) => {
                    Materialize.toast(response.body.error,3000);
                });
            },
            iniciar(state, credenciales) {
                state.cargando = true;
                Vue.http.post("/autentificar/iniciar", credenciales).then((response) => {
                    state.cargando = false;
                    if (!response.body.error) {
                        state.usuario = response.body;
                        state.autentificado = true;
                        router.push("/");
                    } else {
                        Materialize.toast(response.body.error,3000);
                    }
                }, (response) => {
                    Materialize.toast(response.body.error,3000);
                });
            },
            registrar(state, datos) {
                state.cargando = true;
                Vue.http.post("/autentificar/registrar", datos).then((response) => {
                    state.cargando = false;
                    if (!response.body.error) {
                        state.usuario = response.body;
                        state.autentificado = true;
                        router.push("/");
                    } else {
                        Materialize.toast(response.body.error,3000);
                    }
                }, (response) => {
                    Materialize.toast(response.body.error,3000);
                });
            },
            salir(state) {
                Vue.http.get("/autentificar/salir").then((response) => {
                    state.autentificado = false;
                    state.usuario = {};
                }, (response) => {
                    Materialize.toast(response.body.error,3000);
                });
            },
            verificar(state) {
                Vue.http.get("/autentificar/exito").then((response) => {
                    if (response.body.usuario != null) {
                        state.usuario = response.body.usuario;
                        state.autentificado = true;
                    }
                }, (response) => {
                    Materialize.toast(response.body.error,3000);
                });
            }
        }
    });

    //Componente para la API
    var api = {
        template: "#api",
        computed: {
            autentificado() { return maquina.state.autentificado; },
            quejas() { return maquina.state.quejas; }
        },
        data(){
            return { queja: "" };
        },
        filters: {
            mostrarFecha: (fecha) => {
                fecha = new Date(fecha);
                var fechaHora = [];
                fechaHora.push(fecha.getDate() < 10 ? "0"+fecha.getDate() : fecha.getDate() );
                fechaHora.push("/");
                fechaHora.push( (fecha.getMonth() + 1) < 10  ? "0"+(fecha.getMonth() + 1) : fecha.getMonth() + 1 );
                fechaHora.push("/");
                fechaHora.push(fecha.getFullYear());
                fechaHora.push(" a las ");
                fechaHora.push(fecha.getHours());
                fechaHora.push(":");
                fechaHora.push(fecha.getMinutes() < 10 ? "0"+fecha.getMinutes() : fecha.getMinutes() );
                return fechaHora.join("");
            }
        },
        created: function () {
            maquina.commit("obtenerQuejas");
        },
        methods: {
            subirQueja() {
                maquina.commit("subirQueja",this.queja);
                this.queja = "";
                maquina.commit("obtenerQuejas");
            }
        }
    };

    //Componente autentificar
    var autentificar = {
        template: "#autentificar",
        data()  { 
            return {
                datos: { usuario: "", contraseña: "" },
                nuevo: { nombre: "", usuario: "", contraseña: "" }
            };
        },
        methods: {
            registrar: function () {
                maquina.commit("registrar", { nombre: this.nuevo.nombre, usuario: this.nuevo.usuario, contraseña: this.nuevo.contraseña });
            },
            iniciar: function () {
                maquina.commit("iniciar", { usuario: this.datos.usuario, contraseña: this.datos.contraseña });
            }
        }
    }

    //Enrutamiento
    var router = new VueRouter({
        routes: [
            { path: "/", component: api },
            { path: "/autentificar", component: autentificar }
        ]
    });

    //Instancia de Vue
    var app = new Vue({
        el: "#plendo",
        router: router,
        computed: {
            autentificado() { return maquina.state.autentificado; },
            nombre() {
                return maquina.state.usuario.nombre;
            },
            cargando() { return maquina.state.cargando; }
        },
        created: function () {
            maquina.commit("verificar");
        },
        methods: {
            salir() {
                maquina.commit("salir");
            }
        }
    });
    $(".button-collapse").sideNav({closeOnClick: true, menuWidth: 250});
});