"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.setGlobalPrefix('api');
    const port = process.env.PORT ?? 3001;
    await app.listen(port);
    console.log(`\n🚀 Chezroi Backend démarré sur http://localhost:${port}/api`);
    console.log(`📦 Vendors  : http://localhost:${port}/api/vendors`);
    console.log(`🔑 Admin    : http://localhost:${port}/api/admin/vendors`);
    console.log(`🏪 Boutiques: http://localhost:${port}/api/shops\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map