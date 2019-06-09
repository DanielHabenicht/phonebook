# From https://github.com/microsoft/vscode-remote-try-node/blob/master/.devcontainer/Dockerfile

FROM node:11.2.0

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils 2>&1

# Verify git and process tools are installed
RUN apt-get install -y git procps

# Remove outdated yarn from /opt and install via package 
# so it can be easily updated via apt-get upgrade yarn
RUN rm -rf /opt/yarn-* \
    && rm -f /usr/local/bin/yarn \
    && rm -f /usr/local/bin/yarnpkg \
    && apt-get install -y curl apt-transport-https lsb-release \
    && curl -sS https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/pubkey.gpg | apt-key add - 2>/dev/null \
    && echo "deb https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends yarn

# Clean up
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRONTEND=dialog

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable && rm -rf /var/lib/apt/lists/*

# set working directory
RUN  mkdir /workspaces
RUN  mkdir /workspaces/phonebook
RUN  mkdir /workspaces/phonebook/Phonebook.Frontend
WORKDIR /workspaces/phonebook

# Install Angular CLI
RUN npm install -g --unsafe-perm @angular/cli@7.1.4

# Build node_modules folder as this speeds up the build time 
# (npm install is only executed if package.json changes)
COPY ./package-lock.json /workspaces/phonebook/Phonebook.Frontend/package-lock.json
COPY package.json /workspaces/phonebook/Phonebook.Frontend/package.json
RUN cd ./Phonebook.Frontend/ && npm install

# Set the default shell to bash rather than sh
ENV SHELL /bin/bash