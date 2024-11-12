# docker/node/Dockerfile
FROM node:23

WORKDIR /var/www/symfony

COPY package*.json ./
ENV NPM_VERSION=10.3.0
RUN npm install -g npm@"${NPM_VERSION}"

COPY . .

RUN npm run build

CMD ["npm", "run", "watch"]