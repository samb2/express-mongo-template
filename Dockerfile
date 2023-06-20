FROM node:18.16-alpine

WORKDIR /api
COPY package.json .
RUN npm i -g cross-env
RUN npm i --only=prod
COPY . .

CMD ["npm","run", "start"]
EXPOSE 3000
