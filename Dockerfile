FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN $HOME/.yarn/bin/yarn --pure-lockfile

# Bundle app source
COPY . /usr/src/app

EXPOSE 4000

CMD ["$HOME/.yarn/bin/yarn", "start"]