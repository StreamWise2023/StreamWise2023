Если захотите это поднять (хз правда зачем)

1. В нем ничего менять не нужно
```shell
cd ./supabase/docker && cp ./.env.example ./.env
```

2.
```shell
docker compose up -d
```

3.
```shell
cd ./../../
```

4.
```shell
npm install
```

5.
```shell
node app.js
```

У вас откроется сервер на 127.0.0.1:3000 (localhost:3000 если wsl соотвественно)

Пока сликшом мало полезной нагрузки поэтому не вижу смысла в документации
