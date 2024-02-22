const restrict = (...role) => {
  return (req, res, next) => {
    if (req.roles) return next();

    const found = role.some((r) => req.user.role.includes(r));
    if (found && !req.user.isBlock) {
      next();
    } else {
      res
        .status(403)
        .json({
          message: "You Don't have permission to perform this action",
          status: "failure",
        });
    }
  };
};

const restrictAll = (...role) => {
  return (req, res, next) => {
    if (req.roles) return next();
    const found = role.every((r) => req.user.Permissions.includes(r));
    if (found) {
      next();
    } else {
      res
        .status(403)
        .json({
          message: "You Don't have permission to perform this action",
          Status: "failure",
        });
    }
  };
};
module.exports = { restrict, restrictAll };
