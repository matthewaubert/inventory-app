/**
 * format input number to USD
 * @param {number} price - (e.g. 57.3)
 * @returns {string | undefined} number (e.g. '$57.30')
 */
exports.formatPrice = function (price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
