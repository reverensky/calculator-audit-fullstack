const { v4: uuidv4 } = require("uuid");

// Model name to prefix mapping
const idmap = require("./idmap.json");

/**
 * Generates a unique identifier based on model type
 * @param {string} idprefix - The model name for which to generate the ID prefix
 * @returns {string} - A unique ID in the format: {prefix}-{uuid}
 */
function generateId(idprefix) {
  // Ensure the idprefix is valid and corresponds to a model name
  const prefix = idmap[idprefix];
  if (!prefix) {
    throw new Error(
      `Invalid model prefix: ${idprefix}. Valid prefixes are ${Object.keys(
        idmap
      ).join(", ")}`
    );
  }
  return `${prefix}-${uuidv4()}`;
}

module.exports = { generateId };
