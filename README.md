# pathfinder

Простой CLI-инструмент для раздачи файла по HTTP.

## Установка

```bash
bun add -g https://github.com/ffebr/pathfinder-cli.git
```

## Использование

Запустить сервер с файлом:
```bash
pathfinder --file example.txt
```

Указать порт через флаг:
```bash
pathfinder --file example.txt --port 8080
```

Указать порт через переменную окружения:
```bash
PORT=4000 pathfinder --file example.txt
```
