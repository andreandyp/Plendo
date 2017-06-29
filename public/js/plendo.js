$(document).ready((jq) => {

    const router = new VueRouter({
        routes: [
            {
                path: "/", component: {
                    template: "#api",
                    data: function () {
                        return { quejas: [], cargando: false, nqueja: {}, autentificado: true }
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
                    beforeCreate: function () {
                        this.cargando = true;
                    },
                    created: function () {
                        this.$http.get('/api/quejas').then((response) => {
                            this.cargando = false;
                            this.quejas = response.body.reverse();
                        }, () => { console.log("Error en resource"); });
                    },
                }
            },
            {
                path: "/autentificar", component: {
                    template: "#autentificar",
                    data: function () {
                        return {
                            datos: {
                                usuario: "",
                                contraseña: ""
                            },
                            nuevo: {
                                nombre: "",
                                usuario: "",
                                contraseña: "",
                            },
                            errores:{ iniciar: "", registrar: "" }
                        }
                    },
                    methods: {
                        registrar: function(){
                            this.$http.post("/autentificar/registrar",{nombre: this.nuevo.nombre, usuario: this.nuevo.usuario, contraseña: this.nuevo.contraseña}).then( (response) => {
                                if(response.body.mensaje){
                                    this.errores.registrar = response.body.mensaje;
                                }else{
                                    this.errores.registrar = "";
                                    router.push("/");
                                }
                            }, (response) => {
                                console.log("Error en respuesta")
                            });
                        },
                        iniciar: function(){
                            this.$http.post("/autentificar/iniciar",{usuario: this.datos.usuario, contraseña: this.datos.contraseña}).then( (response) => {
                                if(response.body.mensaje){
                                    this.errores.iniciar = response.body.mensaje;
                                }else{
                                    this.errores.iniciar = "";
                                    router.push("/");
                                }
                            }, (response) => {
                                console.log("Error en respuesta")
                            });
                        }
                    }
                }
            }
        ]
    });

    const app = new Vue({
        el: "#plendo",
        router: router
    })
});