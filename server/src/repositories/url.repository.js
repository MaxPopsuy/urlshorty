const { Url } = require("../models");
const urlUtil = require("../utils/url");

exports.get = async (body) => {
  return await Url.find(body);
};
exports.getById = async (id) => {
  return await Url.findById(id);
};
exports.getByOrigUrl = async (url) => {
  return await Url.findOne({ origUrl: url });
};
exports.create = async (body) => {
  return await Url.create(body);
};
