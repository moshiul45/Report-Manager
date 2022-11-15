exports.response = (res, statuscode, status, message, data) => {
  return res.status(statuscode).json({
    status,
    message,
    data,
  });
};
