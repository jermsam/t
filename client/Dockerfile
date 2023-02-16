ARG NGINX_VERSION=1.20.1

FROM node:lts-alpine as global-deps-stage

RUN npm i --location=global @quasar/cli@latest

FROM global-deps-stage as client-dev-stage
WORKDIR /app/client
COPY package*.json ./
COPY . .
FROM client-dev-stage as client-local-deps-stage
RUN npm i

FROM client-local-deps-stage as client-build-stage
ARG QENV
ENV QENV=${QENV}
RUN quasar build

FROM nginx:${NGINX_VERSION}-alpine AS nginx_builder
ENV NGINX_HEADERS_MORE_VERSION=${NGINX_HEADERS_MORE_VERSION:-0.33}
RUN wget "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -O nginx.tar.gz && \
    wget "https://github.com/openresty/headers-more-nginx-module/archive/v${NGINX_HEADERS_MORE_VERSION}.tar.gz" -O headers-more.tar.gz
RUN apk add --no-cache --virtual .build-deps \
  git \
  gcc \
  libc-dev \
  make \
  openssl-dev \
  pcre-dev \
  zlib-dev \
  linux-headers \
  curl \
  gnupg \
  libxslt-dev \
  gd-dev \
  geoip-dev
#udisa
RUN mkdir -p /usr/src

# Reuse same cli arguments as the nginx:alpine image used to build
RUN CONFARGS=$(nginx -V 2>&1 | sed -n -e 's/^.*arguments: //p') \
	tar -zxC /usr/src -f "nginx.tar.gz"

RUN tar -zxvC /usr/src -f "headers-more.tar.gz"

RUN HEADERSMOREDIR="/usr/src/headers-more-nginx-module-${NGINX_HEADERS_MORE_VERSION}" && \
  cd /usr/src/nginx-$NGINX_VERSION && \
  ./configure --without-http_autoindex_module --with-compat $CONFARGS --add-dynamic-module=$HEADERSMOREDIR && \
  make && make install

FROM nginx:${NGINX_VERSION}-alpine as production-stage
# Extract the dynamic module "headers more" from the builder image
COPY --from=nginx_builder /usr/local/nginx/modules/ngx_http_headers_more_filter_module.so /usr/local/nginx/modules/ngx_http_headers_more_filter_module.so
# Extract the dynamic module "headers more" from the builder image
COPY nginx.conf /etc/nginx/
COPY --from=client-build-stage /app/client/dist/spa /usr/share/nginx/html
EXPOSE 80
#STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]


