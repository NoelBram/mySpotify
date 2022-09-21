<<<<<<< HEAD
FROM node:alpine 
=======
FROM node:alpine as BUILD
>>>>>>> 2f0ea50 (Add your commit)
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . . 
<<<<<<< HEAD
EXPOSE 4200
CMD npm run start 
=======
RUN npm run prod


FROM nginx 
EXPOSE 80
COPY --from=BUILD /app/docs /usr/share/nginx/html
>>>>>>> 2f0ea50 (Add your commit)
