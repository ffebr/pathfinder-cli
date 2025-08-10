#!/usr/bin/env bun
import os from "os";
import QRCode from 'qrcode';
import { args } from "./args";

const PORT = args.port as number;

const fileName = args.file;   

console.log("Открываю файл:", fileName);

let file: Uint8Array<ArrayBuffer>;
try {
    file = await Bun.file(fileName!).bytes();
} catch (err) {
    console.error("Ошибка:", err);
    process.exit(1);
}
const contentType = Bun.file(fileName).type || "application/octet-stream";
const ip = Object.values(os.networkInterfaces())
    .flat()
    .find(net => net?.family === "IPv4" && !net.internal)?.address
    ?? "localhost";

const server = Bun.serve({
    port: PORT,
    hostname: "0.0.0.0",
    routes: {
        "/": {
            GET: () => {return new Response(file, {
                headers: {
                    "Content-Type": contentType,
                    "Content-Disposition": `attachment; filename="${fileName}"`,
                }
            })}
        }
    }
})

console.log(`Файл доступен для локальной сети по адресу http://${ip}:${server.port}`);
QRCode.toString(`http://${ip}:${server.port}`, (error, qr) => {
    if (error) {
        console.error("Ошибка:", error);
        process.exit(1);
    }
    console.log(qr);
})
