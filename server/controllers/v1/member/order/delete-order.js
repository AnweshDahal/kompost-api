const orderService = require("../../../../services/v1/member/order");

const httpStatus = require("http-status");

const { ValidationError } = require("../../../../errors");

module.exports = async (req, res, next) => {
  try {
    const reqPermission = "order.delete";
    if (req.decoded.permissions.includes(reqPermission)) {
      const deleteStatus = await orderService.deleteOrder({
        orderId: req.params.orderId,
        userId: req.decoded.id,
      });

      if (deleteStatus) {
        res.status(httpStatus.OK).json({
          message: "success",
        });
      } else {
        res.status(500).json({
          message: "Something went wrong",
        });
      }
    } else {
      throw new ValidationError("No Permission", 403);
    }
  } catch (err) {
    next(err);
  }
};
