$(document).ready((jq) => {

    //Estados y transiciones    
    const maquina = new Vuex.Store({
        state: { quejas: [], usuario: { nombre: "", usuario: "" }, autentificado: false, cargando: false, queja: "", errores: { iniciar: "", registrar: ""} },
        mutations: {
            obtenerQuejas(state) {
                state.cargando = true;
                Vue.http.get('/api/quejas').then((response) => {
                    state.quejas = response.body.reverse();
                    state.cargando = false;
                }, () => { console.log("Error al cargar las quejas"); });
            },
            quejar(state, queja) {
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
            },
            iniciar(state, credenciales) {
                state.cargando = true;
                Vue.http.post("/autentificar/iniciar", credenciales).then((response) => {
                    state.cargando = false;
                    if (!response.body.mensaje) {
                        state.usuario = response.body;
                        state.autentificado = true;
                        state.errores.iniciar = "";
                        router.push("/");
                    } else {
                        console.log("No inicia");
                        state.errores.iniciar = response.body.mensaje;
                    }
                }, (response) => {
                    console.log("Error al iniciar sesión");
                });
            }
        }
    });

    //Componente para la API
    var api = {
        template: "#api",
        computed: {
            autentificado() { return maquina.state.autentificado; },
            cargando() { return maquina.state.cargando; },
            queja: {
                get() { return maquina.state.queja; },
                set(valor) { maquina.commit("quejar", valor) }
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
            subirQueja() {
                maquina.commit("subirQueja");
            }
        }
    };

    //Componente autentificar
    var autentificar = {
        template: "#autentificar",
        data()  { 
            return {datos: { usuario: "", contraseña: "" }};
        },
        computed: {
            errores() { return maquina.state.errores; },
            cargando() { return maquina.state.cargando; },
        },
        methods: {
            registrar: function () {
                /*this.cargando = true;
                this.$http.post("/autentificar/registrar", { nombre: this.nuevo.nombre, usuario: this.nuevo.usuario, contraseña: this.nuevo.contraseña }).then((response) => {
                    this.cargando = false;
                    if (response.body.mensaje) {
                        this.errores.registrar = response.body.mensaje;
                    } else {
                        this.errores.registrar = "";
                        router.push("/");
                    }
                }, (response) => {
                    console.log("Error al registrar")
                });*/
            },
            iniciar: function () {
                maquina.commit("iniciar", { usuario: this.datos.usuario, contraseña: this.datos.contraseña });
            }
        }
    }

    //Enrutamiento
    const router = new VueRouter({
        routes: [
            { path: "/", component: Vue.component("api", api) },
            { path: "/autentificar", component: Vue.component("autentificar",autentificar) }
        ]
    });

    //Instancia de Vue
    const app = new Vue({
        el: "#plendo",
        router: router,
        computed: {
            autentificado() { return maquina.state.autentificado; },
            nombre() { return maquina.state.usuario.nombre; }
        },
        mounted: function () {
            maquina.commit("verificar");
        },
        methods: {
            salir() {
                maquina.commit("salir");
            }
        }
    })
});