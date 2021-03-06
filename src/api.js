const number = {};
const axios = require('axios');
const chalk = require('chalk');

exports.calculate = async (zipcode, subtotal) => {
  const newSubtotal = (+subtotal).toFixed(2);

  await axios
    .get('https://deft-cove-227620.appspot.com/api/tax', {
      auth: {
        username: 'user',
        password: 'token',
      },
      params: {
        zipcode,
      },
    })
    .then(response => {
      if (response.status === 200) {
        number.zipcode = response.data.zipcode;
        number.tax_rate = response.data.tax_rate;
        number.tax_total = (number.tax_rate / 100) * newSubtotal;
        number.total = +newSubtotal + number.tax_total;
      } else {
        console.log(chalk.red(`Error: ${response.status.statusText}`));
      }
    })
    .catch(error => {
      console.log(error);
    });
  const params = {
    zipcode,
    tax_rate: number.tax_rate,
    sub_total: newSubtotal,
    tax_total: number.tax_total.toFixed(2),
    total: number.total.toFixed(2),
  };
  const auth = {
    username: 'user',
    password: 'token',
  };
  await axios
    .post('https://deft-cove-227620.appspot.com/api/order', null, {
      auth,
      params,
    })
    .then(response => {
      if (response.data.status_code === 0) {
        console.log(
          chalk.blue.bold(`Message: ${response.data.status_message}`),
        );
      } else {
        console.log(chalk.red.bold(`Error: ${response.data.status_message}`));
      }
    })
    .catch(error => {
      console.log(error);
    });
};
