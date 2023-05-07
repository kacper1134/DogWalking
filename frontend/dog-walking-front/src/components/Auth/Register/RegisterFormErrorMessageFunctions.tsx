export const getErrorMessageForUsername = (username: string) => {
  const MINIMUM_USERNAME_LENGHT = 3;
  const MAXIMUM_USERNAME_LENGHT = 50;

  if (username.length === 0) return "Username is required.";
  if (username.length < MINIMUM_USERNAME_LENGHT)
    return "Username must be three or more characters.";
  if (username.length > MAXIMUM_USERNAME_LENGHT)
    return "Username must be less than fifty characters.";

  return "";
};

export const getErrorMessageForEmail = (email: string) => {
  const emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (email.length === 0) return "Email is required.";
  if (!emailExpression.test(email))
    return "Please provide a properly formatted email address.";

  return "";
};

export const getErrorMessageForPhoneNumber = (phoneNumber: string) => {
  const phoneNumberExpression: RegExp = /\d{9}/i;

  if (phoneNumber.length === 0) return "";
  if (!phoneNumberExpression.test(phoneNumber))
    return "Please provide a properly formatted phone number - 9 numbers";

  return "";
};

export const getErrorMessageForPassword = (password: string) => {
  if (password === "") return "Password is required.";
  const isValidLength = /^.{8,32}$/;
  if (!isValidLength.test(password)) {
    return "Password must be 8-32 Characters Long.";
  }

  const isWhitespace = /^(?=.*\s)/;
  if (isWhitespace.test(password)) {
    return "Password must not contain Whitespaces.";
  }

  const isContainsUppercase = /^(?=.*[A-Z])/;
  if (!isContainsUppercase.test(password)) {
    return "Password must have at least one Uppercase Character.";
  }

  const isContainsLowercase = /^(?=.*[a-z])/;
  if (!isContainsLowercase.test(password)) {
    return "Password must have at least one Lowercase Character.";
  }

  const isContainsNumber = /^(?=.*[0-9])/;
  if (!isContainsNumber.test(password)) {
    return "Password must contain at least one Digit.";
  }

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  if (!isContainsSymbol.test(password)) {
    return "Password must contain at least one Special Symbol.";
  }

  return "";
};

export const getErrorMessageForFirstName = (firstName: string) => {
  if (firstName === "") return "First name is required.";
  return "";
};

export const getErrorMessageForLastName = (lastName: string) => {
  if (lastName === "") return "Last name is required.";
  return "";
};

export const getErrorMessageForRatePerHours = (ratePerHour: number) => {
  if (ratePerHour < 0) return "Rate Per Hour cannot be negative number!";
  if (ratePerHour > 200) return "Rate Per Hour cannot be higher than $200";
  return "";
}