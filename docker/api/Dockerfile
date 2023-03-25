FROM node:19.2 AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM node:19.2-alpine
ENV PORT=3000
USER node
EXPOSE ${PORT}
WORKDIR /usr/src/app
COPY --chown=node:node package.json package-lock.json prisma ./
RUN npm install --production
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
CMD [ "npm", "run", "start:migrate:prod" ]
