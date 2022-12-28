const html = (strings: readonly string[], ...substitutions: string[]) =>
  String.raw({ raw: strings }, substitutions).trim();

export default html;
