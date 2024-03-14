/**
 * find and return error in given `errors` array with matching `path` value
 * @param {array} errors
 * @param {string} path - (e.g. 'name')
 * @returns {object | undefined} error obj | undefined if not found
 */
exports.findError = (errors, path) => errors.find((err) => err.path === path);

/**
 * format input number to USD for display
 * @param {number} price - (e.g. 57.3)
 * @returns {string | undefined} USD currency (e.g. '$57.30')
 */
exports.formatPrice = (price) =>
  Number.isNaN(Number(price))
    ? undefined
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);

/**
 * format input price to number for storage in database
 * max 2 digits after decimal, remove trailing zeros, no commas
 * @param {number | string} price - (e.g. '2490.304')
 * @returns {number | undefined} (e.g. 2490.3)
 */
exports.sanitizePrice = (price) =>
  Number.isNaN(Number(price))
    ? undefined
    : Number(
        new Intl.NumberFormat('en-US', {
          maximumFractionDigits: 2,
          trailingZeroDisplay: 'stripIfInteger',
          useGrouping: false,
        }).format(price),
      );

/**
 * format input qty to number for storage in database
 * strip all digits after decimal
 * @param {number | string} qty - (e.g. '8.5')
 * @returns {number | undefined} (e.g. 8)
 */
exports.sanitizeQty = (qty) =>
  Number.isNaN(Number(qty)) ? undefined : Math.floor(Number(qty));
