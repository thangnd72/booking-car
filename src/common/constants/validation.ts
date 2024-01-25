export const validationSchema = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[0-9])(?=.*[A-Z]).{8,30}$/,
  number: / ^(0|[1-9][0-9]*)$/,
  phoneNumber: /^[0-9\-\+]{9,15}$/,
};

export const validationError = {
  email: 'Invalid email address',
  password:
    'Password must be 8 to 30 characters and include at least one number and one capital letter.',
  number: 'This field must be a number',
  phoneNumber: 'Phone number is invalid.',
  maxLength: (length: number = 30) => {
    return `This field cannot be longer than ${length} characters.`;
  },
};
