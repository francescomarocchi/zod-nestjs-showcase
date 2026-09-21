import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Makes PrismaService available everywhere without re-importing DatabaseModule
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
