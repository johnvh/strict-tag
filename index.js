class StrictTemplateError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'StrictTemplateError';
  }
}

const isNil = v => v === null || v === undefined;

const strictWith = isInvalid => (parts, ...substs) => {
  let result = parts[0];

  for (const [i, subst] of substs.entries()) {
    const invalid = isInvalid(subst);

    if (invalid) {
      throw new StrictTemplateError(`Template substitution at index ${i} is invalid`);
    }
    result += subst;
    result += parts.raw[i + 1];
  }
  return result;
};

const strict = strictWith(isNil);

module.exports = strict;
module.exports.with = strictWith;
module.exports.StrictTemplateError = StrictTemplateError;
