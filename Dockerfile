FROM node:22-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install --silent
ARG FE_BACKEND_API
ENV FE_BACKEND_API=$FE_BACKEND_API
COPY . .
RUN npm run build
FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
