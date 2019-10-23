FROM node:10

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g parcel-bundler
RUN npm install -g typescript


COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

ENV NODE_ENV production
EXPOSE 9000
CMD [ "node", "dist/index.js" ]
