export const IS8601_REGEX = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/;

export const CHINESE_WORDS_REGEX = /[\u4e00-\u9fa5]+/;

export const ENGLISH_WORDS_REGEX = /^[ a-z_A-Z0-9-\.!@#\$\n%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|，、“”‘’'『』「」［］\s+]+$/;

export const EMAIL_REGEX = /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export const PHONE_REGEX = /[^\d\-+ ]/;

export const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

export const HTTP_REGEX = /^(http:\/\/|https:\/\/)/;

export const ID_REGEX = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

export const PASSPORT_REGEX = /^[a-zA-Z0-9]{5,17}$/;

export const HK_ID_REGEX = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;

export const TW_ID_REGEX = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;
