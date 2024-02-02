export const validationSchema = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[0-9])(?=.*[A-Z]).{8,30}$/,
  number: / ^(0|[1-9][0-9]*)$/,
  phoneNumber: /^[0-9\-\+]{9,15}$/,
};

export const validationError = {
  email: 'Địa chỉ email không hợp lệ.',
  password: 'Mật khẩu phải có từ 8 đến 30 ký tự và bao gồm ít nhất một số và một chữ in hoa.',
  number: 'This field must be a number',
  phoneNumber: 'Vui lòng nhập số điện thoại!',
  maxLength: (length: number = 30) => {
    return `Không thể dài hơn ${length} ký tự.`;
  },
};
