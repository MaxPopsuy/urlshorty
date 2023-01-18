const urlRepository = require("../repositories/url.repository");
const urlUtil = require("../utils/url");

exports.findAll = async (req, res, next) => {
  try {
    res.status(200).json(await urlRepository.get());
  } catch (error) {
    next(error);
  }
};
exports.create = async (req, res, next) => {
  try {
    const { origUrl } = req.body;
    const base = `https://urlshorty-am8i.onrender.com/redirect`;
    console.log("worked");
    if (urlUtil.validateUrl(origUrl)) {
      console.log("worked util");
      try {
        let url = await urlRepository.getByOrigUrl(origUrl);
        console.log(url);
        if (url) {
          res.json(url);
        } else {
          console.log("worked");
          const newUrl = await urlRepository.create({ origUrl, clicks: 0 });

          const shortUrl = `${base}/${newUrl.id}`;

          newUrl.shortUrl = shortUrl;
          // url = urlRepository.create({
          //   origUrl,
          //   shortUrl,
          //   date: new Date(),
          // });

          await newUrl.save();
          res.json(newUrl);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
      }
    } else {
      res.status(400).json({ message: "Invalid Url" });
    }
  } catch (error) {
    next(error);
  }
};

exports.redirect = async (req, res, next) => {
  try {
    console.log(req.params);
    const url = await urlRepository.getById(req.params.id);

    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.origUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};
