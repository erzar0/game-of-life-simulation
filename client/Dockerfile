FROM node:lts as developement
WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci 
COPY . /code
CMD [ "npm", "run", "dev"]

# FROM node:lts as production 
# RUN npm ci 



