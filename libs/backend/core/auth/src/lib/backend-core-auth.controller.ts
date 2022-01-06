import { Controller } from '@nestjs/common';
import { BackendCoreAuthService } from './backend-core-auth.service';

@Controller('backend-core-auth')
export class BackendCoreAuthController {
  constructor(private backendCoreAuthService: BackendCoreAuthService) {}
}
