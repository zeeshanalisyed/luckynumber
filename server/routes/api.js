module.exports = (router) => {
  router.route('/default').get(services.UUID, CTRL.defaults);
  router.route('/:num').get(services.UUID, services.auth, CTRL.isValidRange, CTRL.match);
  return router;
}