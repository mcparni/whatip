FROM ubuntu:18.04
EXPOSE 3000
COPY . .
ENV PORT=3000
RUN apt-get update &&  apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt install -y nodejs
RUN npm install
CMD ["node","index.js"]

