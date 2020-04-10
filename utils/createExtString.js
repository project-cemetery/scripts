const createExtString = (normal, ...additional) => {
    const all = [...normal, ...additional];
    if (all.length === 1) {
      return all[0];
    }
  
    return `{${all.join(',')}}`;
  };
  
  module.exports = createExtString;