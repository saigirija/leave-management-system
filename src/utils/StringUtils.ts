import { capitalize } from 'lodash';

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PHONE_REGEX = /^[789]\d{9}$/;

export const capitalizeEnum = (label: string) =>
  label
    .split('_')
    .map((str) => capitalize(str))
    .join(' ');
