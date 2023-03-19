# node-rest-api-server

## 概要

node-rest-api-serverのDockerイメージ。

## imageの構築方法

```bash
docker build -t node-rest-api-server -f docker/Dockerfile .
```

## コンテナの起動方法

```bash
docker run -d -p 3000:3000 --name node-rest-api-server node-rest-api-server
```
