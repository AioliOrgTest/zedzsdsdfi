FROM 510467250861.dkr.ecr.us-east-1.amazonaws.com/percipio-base:node-22-alpine
ARG PROJECT_KEY="ENGSEC"
ARG POD_NAME="zedzsdsdfi"
LABEL group=$PROJECT_KEY \
  # container=$POD_NAME \ COMMENT For teST
  base="node-22-alpine"

ENV HOME /home/deploy
ENV NODE_ENV production
WORKDIR $HOME

RUN set -ex \
  && apk -U --no-cache upgrade \
  && apk add --no-cache \
  bash \
  curl \
  python3 \
  build-base \
  gcc \
  g++ \
  zlib-dev \
  musl-dev \
  cyrus-sasl-dev \
  lz4-dev \
  openssl-dev \
  libc-dev \
  make

RUN adduser -D -h $HOME -u 10001 deploy

COPY package.json $HOME
COPY .npmrc $HOME

RUN set -ex \
  && npm install --omit=dev --omit=optional --loglevel=error

COPY . $HOME

RUN chown -R deploy:deploy $HOME

USER deploy

EXPOSE 8080

CMD [ "npm", "run", "start" ]