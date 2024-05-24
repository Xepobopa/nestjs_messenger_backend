import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: { credentials: true, origin: "*" },
    });
    const config = app.get<ConfigService>(ConfigService);

    // app.enableCors({ credentials: true, origin: true });
    app.use(cookieParser(config.get<string>("COOKIE_SECRET")));
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(config.get<number>("PORT"), () =>
        console.log("Host on http://localhost:5000")
    );
}

bootstrap();
