export const translateFromKey = (t, messages, field = "error") => {
  if (messages) {
    messages = messages
      .replace("Validation failed:", "")
      .replace(/\s+/g, "")
      .split(",")
      .map((key) => t(`${field}.${key}`))
      .join(", ");
  }
  return messages;
};
