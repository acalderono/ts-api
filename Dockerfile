FROM node:alpine
WORKDIR /app
COPY package.json /app
COPY dist/index.js /app
ENV PORT=3000
RUN npm install --production
CMD ["node", "index.js"]
EXPOSE 3000