FROM node
WORKDIR /app
COPY package.json .
RUN npm install -g npm@8.5.1
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
