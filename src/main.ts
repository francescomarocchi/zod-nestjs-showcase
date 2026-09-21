import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable Zod validation globally
    app.useGlobalPipes(new ZodValidationPipe());

    // Configure Swagger UI
    const config = new DocumentBuilder()
        .setTitle("Zod + Prisma NestJS API")
        .setDescription(
            "Demonstrating Zod schemas across Clean Architecture layers",
        )
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    await app.listen(3000);
    console.log("App running on: http://localhost:3000");
    console.log("Swagger UI available at: http://localhost:3000/docs");
}
bootstrap();
