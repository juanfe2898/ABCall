# Usar una imagen base ligera de servidor web
FROM nginx:alpine

# Copiar los archivos de tu proyecto al directorio de Nginx
COPY ./html /usr/share/nginx/html
COPY ./css /usr/share/nginx/html/css
COPY ./js /usr/share/nginx/html/js

# Exponer el puerto 80 para que Nginx pueda servir
EXPOSE 80

# Iniciar Nginx cuando el contenedor esté en ejecución
CMD ["nginx", "-g", "daemon off;"]
