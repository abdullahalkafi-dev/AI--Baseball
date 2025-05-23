FROM node:22.13.0

WORKDIR /app

COPY package.json  pnpm-lock.yaml ./

RUN  npm install -g pnpm && pnpm install

COPY . .

EXPOSE 5005

# Build or run your app
CMD ["pnpm","run","dev"]
