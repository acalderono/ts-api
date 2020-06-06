FROM node:alpine
WORKDIR /app
COPY package.json /app
COPY dist/index.js /app
ENV PORT=3000
RUN npm install --production
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]