const orderService = require("../../../../services/v1/admin/order");

const httpStatus = require("http-status");

const { ValidationError } = require("../../../../errors");

module.exports = async (req, res, next) => {
  try {
    const reqPermission = "order.update";
    if (req.decoded.permissions.includes(reqPermission)) {
      const order = await orderService.updateOrder(
        req.params.orderId,
        req.body
      );

      res.status(httpStatus.OK).json({
        message: "Success",
        data: order,
      });
    } else {
      throw new ValidationError("No Permission", 403);
    }
  } catch (err) {
    next(err);
  }
};
