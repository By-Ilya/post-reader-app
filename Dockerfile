FROM node:16.14.2 AS builder

WORKDIR /post-reader-app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.21.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /post-reader-app/build /var/www/html

EXPOSE 80
