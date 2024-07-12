FROM node:20-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /app

RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install
RUN npm run build --prod


FROM nginx:latest 
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder 
COPY --from=build /app/dist/client-ui/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf