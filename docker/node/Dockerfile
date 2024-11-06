FROM node:23

WORKDIR /var/www/symfony

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "watch"]