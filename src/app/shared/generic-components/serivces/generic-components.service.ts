import { Injectable } from '@angular/core';
import { Constants } from '../Constants/constants';

@Injectable({
  providedIn: 'root'
})
export class GenericComponentsService {

  patternTypes = Constants.PatternTypes;

  constructor() { }

  VerifyPatterType(patternType: any, localizedData: any): any {
    debugger;
    switch (patternType) {
      case this.patternTypes.ONLYTEXT: return this.isEmptyOrDefault(localizedData['1752'], 'Special Characters/Numbers not allowed');
      case this.patternTypes.ONLYNUMERIC: return this.isEmptyOrDefault(localizedData['1753'], 'Only numbers');
      case this.patternTypes.ONLYALPHANUMBERIC: return this.isEmptyOrDefault(localizedData['1756'], 'Only alpha numeric');
      case this.patternTypes.ONLYDATETIME: return this.isEmptyOrDefault(localizedData['1758'], 'Accepts format &1'); //TODO: Replace &1 with datetime format
      case this.patternTypes.ALPHANUMERICSPECIAL_ERROR: return this.isEmptyOrDefault(localizedData['1758'], 'Accepts only Alphanumeric with -_space');  //Accepts only Alphanumeric with -_space
      case this.patternTypes.ALPHANUMERICSPECIAL_MORE_ERROR: return this.isEmptyOrDefault(localizedData['1760'], 'Accepts only Alphanumeric with -.,_space'); localizedData['']; //Accepts only Alphanumeric with -.,_space  
      case this.patternTypes.PORTNUMBER_ERROR: return this.isEmptyOrDefault(localizedData['1762'], 'Port number must be between 1 to 65535');
      case this.patternTypes.MACADDRESS_ERROR: return this.isEmptyOrDefault(localizedData['1761'], 'Accepts only Alphanumeric, hyphen(-) and colon(:)');
      case this.patternTypes.ONLYIPADDRESS: return this.isEmptyOrDefault(localizedData['1757'], 'Accepts IP Address formats only  Ex: dd.dd.dd.dd');
      case this.patternTypes.DECIMALS_ERROR: return this.isEmptyOrDefault(localizedData['1763'], 'Accepts only numbers or decimals');
      case this.patternTypes.EMAIL_ERROR: return "Enter Valid Email"; // Localization is required
      case this.patternTypes.WEBSITE_ERROR: return "Enter Valid URL"; // Localization is required
      default:
        break;
    }
  }

  getErrorMessage(control: any, errorTypesList: string[], patternType: string, localizedData: any): string {
    debugger
    if (errorTypesList.length === 0 && control.hasError('required')) {
      return this.isEmptyOrDefault(localizedData['1751'], 'Required');
    }

    for (const key of errorTypesList) {
      switch (key) {
        case Constants.ErrorType.REQUIRED.toUpperCase():
          if (control.hasError('required')) {
            return this.isEmptyOrDefault(localizedData['1751'], 'Required');
          }
          break;
        case Constants.ErrorType.MAXLENGTH:
          if (control.hasError('maxlength')) {
            return localizedData['1754'] === undefined ? "Must be $ characters long".replace('$', control.errors.maxlength.requiredLength) : localizedData['1754'].replace('$', control.errors.maxlength.requiredLength);
          }
          break;
        case Constants.ErrorType.MAXVALUE:
          if (control.hasError('max')) {
            return 'Percentage should not exceed 100%';
          }
          break;
        case Constants.ErrorType.PATTERN:
          if (control.hasError('pattern')) {
            return this.VerifyPatterType(patternType, localizedData);
          }
          break;
        case Constants.ErrorType.INVALID:
          return control.hasError('INVALID') ? control.hasError('INVALID') : '';
      }
    }

    return '';
  }

  isEmptyOrDefault(val, defaultValue = ''): string {
    return (val === undefined || val === null) ? defaultValue : val;
  }

  setDefaultValueForConfigs<T>(config: T, defaults: Partial<T>): T {
    return { ...defaults, ...config };
  }
}
