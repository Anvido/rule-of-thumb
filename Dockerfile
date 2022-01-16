# Config taked from https://rsbh.dev/blog/dockerize-react-app
FROM node:16-alpine AS builder
WORKDIR /app
# COPY package.json ./
# RUN npm install
# I copy the build folder because now I have this issue https://github.com/facebook/create-react-app/issues/11930 and build doesn't work running docker build
COPY build /app/build
# RUN npm run build

FROM nginx:1.19-alpine AS server
# It works because we dont have routes in our SPA
COPY --from=builder ./app/build /usr/share/nginx/html