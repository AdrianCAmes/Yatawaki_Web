const bindErrorInterceptor = (axiosInstance) => 
axiosInstance.interceptors.response.use(
  response => response,
  err => {
    if(!err.response){
      return Promise.reject({
        codError: 999,
        mensaje: "Se presento un problema, reporte e intente luego",
        timestamp: new Date(),
        detalles: null
      });
    }
    return Promise.reject(err.response.data);
  }
);

export default bindErrorInterceptor;