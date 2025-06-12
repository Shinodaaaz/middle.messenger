type ValidatorFn = (value: string, req?: boolean) => string;

export const validateName: ValidatorFn = (value, req = true) => {
  const regex = /^[А-ЯA-Z][а-яa-zА-ЯA-Z-]*$/;
  if (req && !value) return 'Field is required';
  if (value && !regex.test(value)) return 'Only letters, the first capital letter, a hyphen is allowed.';
  return '';
};

export const validateLogin: ValidatorFn = (value, req = true) => {
  const regex = /^(?=[a-zA-Z0-9_-]{3,20}$)(?!^\d+$)[a-zA-Z0-9_-]+$/;
  if (req && !value) return 'Field is required';
  if (value && !regex.test(value)) return 'Invalid login';
  return '';
};

export const validateEmail: ValidatorFn = (value, req = true) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  if (req && !value) return 'Field is required';
  if (value && !regex.test(value)) return 'Invalid email';
  return '';
};

export const validatePassword: ValidatorFn = (value, req = true) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
  if (req && !value) return 'Field is required';
  if (value && !regex.test(value)) return 'The password must contain a capital letter and a number';
  return '';
};

export const validatePhone: ValidatorFn = (value, req = true) => {
  const regex = /^\+?\d{10,15}$/;
  if (req && !value) return 'Field is required';
  if (value && !regex.test(value)) return 'Invalid phone number';
  return '';
};

export const validateMessage: ValidatorFn = (value, req = true) => {
  if (req && !value.trim()) return 'The message should not be empty';
  return '';
};
