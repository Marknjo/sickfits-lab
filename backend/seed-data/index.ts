/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { KeystoneContext } from '@keystone-6/core/types';
import { products } from './data';

export async function insertSeedData(ctx: KeystoneContext) {
  // Keystone API changed, so we need to check for both versions to get keystone

  const { db } = ctx;

  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);

  await Promise.all([
    ...products.map((product) => {
      console.log(`  🛍️ Adding Product Image: ${product.description} \n`);
      return db.ProductImage.createOne({
        data: {
          altText: product.description,
        },
      });
    }),
    ...products.map((product) => {
      console.log(`  🛍️ Adding Product: ${product.name}`);
      console.table(product);
      return db.Product.createOne({ data: product });
    }),
  ]);

  // for (const product of products) {
  //   console.log(`  🛍️ Adding Product: ${product.name}`);

  //   const { id } = await db.ProductImage.createOne({
  //     data: {
  //       altText: product.description,
  //     },
  //   });

  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   // product.photo = id;

  //   console.log({ id });
  //   console.table(product);

  //   await db.Product.createOne({ data: product });
  // }

  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
