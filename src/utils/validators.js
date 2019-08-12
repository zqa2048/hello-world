import { formatMessage } from 'umi/locale';
import { EMAIL_REGEX, PHONE_REGEX } from './regex';

export function phoneVerify(rule, value, callback) {
  const phoneReg = PHONE_REGEX;
  if (value) {
    if (!phoneReg.test(value)) {
      callback(formatMessage({ id: 'validation.phone-number.wrong-format' }));
    } else {
      callback();
    }
  } else {
    callback(formatMessage({ id: 'validation.phone-number.required' }));
  }
}

export function phoneAndEmailVerify(rule, value, callback) {
  const phoneReg = PHONE_REGEX;
  const emailReg = EMAIL_REGEX;
  if (value) {
    if (phoneReg.test(value) && !emailReg.test(value)) {
      callback(formatMessage({ id: 'validation.phone-email.wrong-format' }));
    } else {
      callback();
    }
  } else {
    callback(formatMessage({ id: 'validation.phone-email.required' }));
  }
}
