FROM node:alpine as BUILD
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . . 
RUN npm run prod


FROM nginx 
EXPOSE 80
COPY --from=BUILD /app/docs /usr/share/nginx/html
