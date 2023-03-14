FROM node:lts-alpine AS service-stage
WORKDIR /app/service
COPY package*.json ./

RUN npm i

ARG NODE_ENV

RUN if [ "$NODE_ENV"="development" ]; \
        then npm i; \
        else npm i --only=production; \
    fi
COPY . .
EXPOSE 3031

CMD ["npm","run","migrate"]
CMD ["npm","run","start"]

