FROM node:10.18.0-alpine3.9

EXPOSE 3000

RUN apk add --update curl
WORKDIR /usr/src/app

# COPY package.json package-lock.json* ./

RUN npm install -g nodemon
    # && cache clean --force

COPY . .

CMD ["npm", "start"]
