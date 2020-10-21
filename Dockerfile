# # develop stage
# FROM node:13.7-alpine as develop-stage
# WORKDIR /app
# COPY package.json ./
# # COPY package*.json ./
# RUN npm install -g @quasar/cli
# COPY . .
# # build stage
# FROM develop-stage as build-stage
# RUN npm install
# RUN quasar build
# # production stage
# FROM nginx:1.17.5-alpine as production-stage
# COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# develop stage
FROM node:13.7 as build-stage
# COPY . ./app
COPY ["." ,  "/app/"]
WORKDIR /app
# COPY package.json ./
# COPY package*.json ./
# RUN npm install -g @quasar/cli
RUN npm install
RUN npm run build
# production stage
FROM nginx:1.17.5-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

