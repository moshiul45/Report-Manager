exports.response = (res, status, message, data) => {
  return res.status(200).json({
    status,
    message,
    data,
  });
};
