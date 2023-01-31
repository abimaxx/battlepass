FROM 249049698252.dkr.ecr.us-east-1.amazonaws.com/node-15.2 AS builder
ENV NODE_ENV build

WORKDIR /app
COPY .env .env
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install 
COPY . .
RUN npm run build


FROM 249049698252.dkr.ecr.us-east-1.amazonaws.com/node-15.2-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["sh", "service.sh"]


