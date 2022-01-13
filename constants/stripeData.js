require("dotenv").config(***REMOVED***

const couponsLive = {
  freeYearPro: "tbyPys9Y",
***REMOVED***;

const couponsTest = {
  freeYearPro: "1U95ho4B",
***REMOVED***;

const productsLive = {
  pro: {
    month: "price_1KHc14I8C7KcVoSyCHwBi3aX",
    year: "price_1KHc14I8C7KcVoSyKOtuyz8F",
  ***REMOVED***,
  basic: {
    month: "price_1KHc19I8C7KcVoSyFhd5EEap",
    year: "price_1KHc19I8C7KcVoSyLXr3Ko3z",
  ***REMOVED***,
***REMOVED***;

const productsTest = {
  pro: {
    month: "price_1K64chI8C7KcVoSyUj7qgv65",
    year: "price_1K64e7I8C7KcVoSySAubpPyj",
  ***REMOVED***,
  basic: {
    month: "price_1K64RzI8C7KcVoSyJ6MjuR8i",
    year: "price_1K64eWI8C7KcVoSyvxqt7X0y",
  ***REMOVED***,
***REMOVED***;

***REMOVED***

module.exports = {
  coupons: env === "production" ? couponsLive : couponsTest,
  products: env === "production" ? productsLive : productsTest,
***REMOVED***;
