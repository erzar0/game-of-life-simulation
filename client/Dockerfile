FROM node:lts as developement
ENV PORT=3000
WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm install 
COPY . /code
CMD [ "npm", "run", "dev"]

# FROM node:lts as production 
# RUN npm ci 



