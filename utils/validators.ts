const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";
  return "";
};

const strongPasswordValidator = (password: string) => {
  if (password.length < 8) return "Password must be at least 8 characters";
  if (password.search(/[a-z]/) < 0)
    return "Password must contain at least one lowercase letter";
  if (password.search(/[A-Z]/) < 0)
    return "Password must contain at least one uppercase letter";
  if (password.search(/[0-9]/) < 0)
    return "Password must contain at least one number";
  return "";
};

export default { emailValidator, strongPasswordValidator };
