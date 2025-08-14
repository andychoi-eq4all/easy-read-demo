FROM nginx:stable-alpine

WORKDIR /usr/src/app
RUN rm -rf /etc/nginx/conf.d

RUN chmod 400 /etc/shadow

COPY conf /etc/nginx
COPY conf_nginx/nginx.conf /etc/nginx/nginx.conf

COPY dist /usr/src/app

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]