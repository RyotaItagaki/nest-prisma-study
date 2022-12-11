import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.user.upsert({
    where: { name: 'Bob' }, // データベースを設置する場所
    update: {}, // データ更新をする必要がないのでとりあえず保留
    // データの中身を設計する
    create: {
      name: 'Bob',
      description: 'エンジニア',
    },
  });

  const post2 = await prisma.user.upsert({
    where: { name: 'Alice' },
    update: {},
    create: {
      name: 'Alice',
      description: 'マネージャー',
    },
  });

  console.log({ post1, post2 });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
