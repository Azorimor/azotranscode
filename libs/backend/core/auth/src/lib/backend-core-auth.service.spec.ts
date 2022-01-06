import { Test } from '@nestjs/testing';
import { BackendCoreAuthService } from './backend-core-auth.service';

describe('BackendCoreAuthService', () => {
  let service: BackendCoreAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendCoreAuthService],
    }).compile();

    service = module.get(BackendCoreAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
