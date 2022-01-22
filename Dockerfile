FROM node

WORKDIR /code

RUN mkdir -p /node_modules && chown -R node:node /node_modules
COPY --chown=node:node . .

COPY package*.json ./

RUN npm install

RUN npm install -g sequelize-cli
RUN npm install -g nodemon
RUN npm install --platform=linux --arch=x64 sharp

COPY . .


EXPOSE 4000

CMD npm run prod
