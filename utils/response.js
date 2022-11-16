exports.response = (res, statuscode, status, message, data) => {
  if (data) {
    return res.status(statuscode).json({ status, message, data });
  } else {
    return res.status(statuscode).json({ status, message });
  }
};
