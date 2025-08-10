import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const args = yargs(hideBin(process.argv))
    .usage("Usage: $0 --file <filename> [--port <port>]")
    .option("file", {
        alias: "f",
        type: "string",
        description: "Путь к файлу для раздачи (обязательный аргумент)",
        demandOption: true,
    })
    .option("port", {
        alias: "p",
        type: "number",
        description: "Порт для запуска сервера",
        default: () => {
            return Bun.env.PORT ?? 0;
        }
    })
    .help("help")
    .alias("help", "h")
    .epilog(`
Пример:
pathfinder --file example.txt
pathfinder --file example.txt --port 8080
PORT=4000 pathfinder --file example.txt`)
  .strict()
  .parseSync();
