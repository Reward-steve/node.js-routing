module.exports = function replaceTemplate(temp, data) {
  let output = temp.replace(/bg_color/g, data.bg_color);
  output = output.replace(/POSITION/g, data.position);
  output = output.replace(/{%CATEGORY%}/g, data.category);
  output = output.replace(/{%TIP%}/g, data.tip);
  output = output.replace(
    /{%STATISTIC%}/g,
    data.statistic === undefined ? data.quote : data.statistic
  );
  return output;
};
