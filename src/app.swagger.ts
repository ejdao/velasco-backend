import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const title = 'Velasco App';

interface ConfigI {
  name: string;
  url: string;
  version: string;
  modules: any[];
}

const config: ConfigI[] = [
  // --- //
];

export const initSwagger = (app: INestApplication) => {
  const principalOptions = new DocumentBuilder()
    .setTitle(title)
    .setVersion('1.0')
    .build();
  const principalDocument = SwaggerModule.createDocument(app, principalOptions);
  const swaggerOptionsUrls: { name: string; url: string }[] = [];

  config.forEach((el) =>
    swaggerOptionsUrls.push({ name: el.name, url: `${el.url}/swagger.json` }),
  );

  SwaggerModule.setup('docs', app, principalDocument, {
    explorer: true,
    swaggerOptions: { urls: swaggerOptionsUrls },
    jsonDocumentUrl: `/docs/swagger.json`,
  });

  config.forEach((el) => {
    const documentBuilder = new DocumentBuilder()
      .setTitle(`${title} (${el.name})`)
      .setVersion(el.version)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, documentBuilder, {
      include: el.modules,
    });

    SwaggerModule.setup(el.url, app, document, {
      explorer: true,
      jsonDocumentUrl: `${el.url}/swagger.json`,
    });
  });
};
