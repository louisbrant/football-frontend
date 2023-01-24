### STAGE 1: Build APP ###
FROM node:14.15 as builder-app

RUN npm config set unsafe-perm true && mkdir /app
COPY . /app/angular-client
WORKDIR /app/angular-client
RUN npm ci
RUN npm run build

### STAGE 2: Nginx ###
FROM nginx:alpine as main
LABEL maintainer="office@pandarium.pro"

ENV TZ=UTC+3
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

## Copy our default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder-app /app/angular-client/dist /app/angular-client/football
# COPY ./front-admin/dist /app/front-admin

CMD ["nginx", "-g", "daemon off;"]
EXPOSE 443 80

