function prefixID(htmlPart) {
  let idMatches = htmlPart.match(/^<h\d\s[^>]*class=(?:"|')([^"']+)/);
  let id = "";
  if (idMatches) {
    id = idMatches[1];
  } else {
    id =
		"zxb"+
      parseInt(Math.random() * 1000, 10) +
      "_" +
      parseInt(Math.random() * 100 * 100);
    htmlPart = htmlPart.replace(/(^<h\d)/, `$1 class="${id}" `);
  }
  return {
    htmlPart,
    id,
  };
}

function Toc(article) {
  var toc = [];
  article = article.replace(
    /<h(\d)(?:\s[^>]+)*>([^<]+)/g,
    (htmlPart, indent, text) => {
      let prefix = prefixID(htmlPart, indent, text);
      toc.push({
        indent,
        text,
        id: prefix.id,
      });
      return prefix.htmlPart;
    }
  );
  let minItendent = Math.min.apply(
    Math,
    toc.map((item) => item.indent)
  );
  toc.forEach((item) => {
    item.indent = item.indent - minItendent;
  });
  return {
    article,
    toc,
  };
}

export default Toc;
