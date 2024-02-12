# How to build this image:
##  The following variables are optional because they already have a default value
##  export PORT=<your-port>
##  export BASE_PATH=<base-path>
##  export GITHUB_BRANCH=develop
##  cd <your-lths-mui-folder>
##  git checkout $GITHUB_BRANCH -f
##  docker build --no-cache [--build-arg BASE_PATH] [--build-arg GITHUB_BRANCH] -t lths-mui:<tag> . -f ./apps/mms/docker/Dockerfile

# How to create and run the container:
##  docker run --name <lths-mui-container-name> -p $PORT:$PORT -d lths-mui:<tag>

FROM nginx:1.25.1-alpine3.17

ARG PORT=4200
ARG BASE_PATH=/
ARG NX_PUBLIC_HOST_PROTOCOL="https"
ARG NX_PUBLIC_API_HOST_DOMAIN="localhost"
ARG NX_PUBLIC_WEB_ENV=""
ARG NX_PUBLIC_API_HOST_VERSION_PATH="/api"
ARG NX_PUBLIC_API_KEY
ARG GITHUB_BRANCH=develop
ENV PORT $PORT
ENV BASE_PATH $BASE_PATH
ENV NX_PUBLIC_HOST_PROTOCOL $NX_PUBLIC_HOST_PROTOCOL
ENV NX_PUBLIC_API_HOST_DOMAIN $NX_PUBLIC_API_HOST_DOMAIN
ENV NX_PUBLIC_WEB_ENV $NX_PUBLIC_WEB_ENV
ENV NX_PUBLIC_API_HOST_VERSION_PATH $NX_PUBLIC_API_HOST_VERSION_PATH
ENV NX_PUBLIC_API_KEY $NX_PUBLIC_API_KEY
ENV GITHUB_BRANCH $GITHUB_BRANCH

# Prevent dialog during apt install
ENV DEBIAN_FRONTEND noninteractive

WORKDIR /workspace/lths-mui
COPY . /workspace/lths-mui

RUN apk update && \
    apk add curl nano git bash yarn apache2-utils nodejs npm yarn && \
    cat /etc/os-release && \
    # checkout the right branch
    cd /workspace/lths-mui && \
    git checkout $GITHUB_BRANCH -f && \
    # configure nginx
    cp /workspace/lths-mui/apps/mms/docker/mms.conf /etc/nginx/conf.d/default.conf && \
    yarn install && \
    # touch .htpasswd file
    touch /etc/nginx/.htpasswd && \
    # build the app
    yarn nx build mms --configuration=development --skip-nx-cache --baseHref=$([[ -z "$BASE_PATH" ]] && echo "/" || echo $BASE_PATH)

EXPOSE $PORT

CMD nginx -g "daemon off;"
