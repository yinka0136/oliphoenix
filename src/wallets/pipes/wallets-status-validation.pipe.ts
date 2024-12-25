import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { WalletStatus } from '../wallets.enum';
@Injectable()
export class WalletStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    WalletStatus.OPEN,
    WalletStatus.IN_PROGRESS,
    WalletStatus.DONE,
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.checkIfStatusIsAllowed(value)) {
      throw new BadRequestException(`The status you entered is invalid`);
    }
    return value;
  }

  checkIfStatusIsAllowed(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
