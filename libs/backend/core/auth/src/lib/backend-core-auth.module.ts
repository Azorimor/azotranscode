import { Module } from '@nestjs/common';
import { BackendCoreAuthController } from './backend-core-auth.controller';
import { BackendCoreAuthService } from './backend-core-auth.service';

@Module({
  controllers: [BackendCoreAuthController],
  providers: [BackendCoreAuthService],
  exports: [BackendCoreAuthService],
})
export class BackendCoreAuthModule {}
