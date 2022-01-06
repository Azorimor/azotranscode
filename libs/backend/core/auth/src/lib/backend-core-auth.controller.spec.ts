import { Test } from '@nestjs/testing';
import { BackendCoreAuthController } from './backend-core-auth.controller';
import { BackendCoreAuthService } from './backend-core-auth.service';

describe('BackendCoreAuthController', () => {
  let controller: BackendCoreAuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendCoreAuthService],
      controllers: [BackendCoreAuthController],
    }).compile();

    controller = module.get(BackendCoreAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
