const successResponse = ({
  data = undefined,
  message = undefined
}) => {
  return {
    status: 'success',
    data,
    message
  }
}

module.exports = {
  successResponse
}
