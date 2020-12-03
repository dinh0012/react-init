const omit = (obj, fields: string[]) => {
  const shallowCopy = {
    ...obj,
  };
  fields.forEach(field => {
    delete shallowCopy[field];
  });

  return shallowCopy;
};

export default omit;
