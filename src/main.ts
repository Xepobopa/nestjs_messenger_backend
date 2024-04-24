import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigService>(ConfigService);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(config.get<number>("PORT"), () =>
        console.log("Host on http://localhost:5000")
    );
}

bootstrap();
