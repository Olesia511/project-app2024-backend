const ctrlWrapper = (controller) => {
  const funcWrap = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return funcWrap;
};

export default ctrlWrapper;
