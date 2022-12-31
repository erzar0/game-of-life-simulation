FROM node:14.18.2 as developement

ENV NODE_ENV developement

WORKDIR /code

COPY package.json .
COPY package-lock.json .

RUN npm ci 

COPY . .

CMD ["npm", "run", "dev"]
