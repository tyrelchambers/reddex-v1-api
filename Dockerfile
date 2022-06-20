FROM node:16.14.0

WORKDIR /code

RUN mkdir -p /node_modules && chown -R node:node /node_modules
COPY --chown=node:node . .

COPY package*.json ./

RUN npm install

RUN npm install -g sequelize-cli nodemon

COPY . .


EXPOSE 4000

CMD npm run prod
