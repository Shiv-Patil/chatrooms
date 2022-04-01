export default (length, exclude, tries = 5) => {
  for (let i = 0; i < tries; i++) {
    const gen = (Math.random() + 1.01).toString(18).substring(2, min(2 + length, 12));
    if (!exclude || !exclude.has(gen)) return gen;
  }
  return new Error("Cannot generate random string");
};
