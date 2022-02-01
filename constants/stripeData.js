require("dotenv").config();

const couponsLive = {
  free6MonthsPro: "tbyPys9Y",
};

const couponsTest = {
  free6MonthsPro: "XRW4d5fo",
};

const productsLive = {
  pro: {
    month: "price_1KHc14I8C7KcVoSyCHwBi3aX",
    year: "price_1KHc14I8C7KcVoSyKOtuyz8F",
  },
  basic: {
    month: "price_1KHc19I8C7KcVoSyFhd5EEap",
    year: "price_1KHc19I8C7KcVoSyLXr3Ko3z",
  },
};

const productsTest = {
  pro: {
    month: "price_1K64chI8C7KcVoSyUj7qgv65",
    year: "price_1K64e7I8C7KcVoSySAubpPyj",
  },
  basic: {
    month: "price_1K64RzI8C7KcVoSyJ6MjuR8i",
    year: "price_1K64eWI8C7KcVoSyvxqt7X0y",
  },
};

const env = process.env.NODE_ENV || "development";

module.exports = {
  coupons: env === "production" ? couponsLive : couponsTest,
  products: env === "production" ? productsLive : productsTest,
};
