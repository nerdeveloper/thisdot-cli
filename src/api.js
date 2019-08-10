'use strict';

const number = {};
const axios = require('axios');

export const calculate = async (zipcode, subtotal) => {

    await axios.get('https://deft-cove-227620.appspot.com/api/tax', {
        auth: {
            username: 'user',
            password: 'token'
        },
        params: {
            zipcode: zipcode,
        },

    }).then(response => {
        number.zipcode = response.data.zipcode;
        number.tax_rate = response.data.tax_rate;
        number.tax_total = (number.tax_rate / 100) * subtotal;
        console.log(typeof subtotal, typeof number.tax_total);
        number.total = +subtotal + number.tax_total;

 }).catch(error => {
        console.log(error);
    });
    await console.log(number.total)
    const params = {
        zipcode: zipcode,
        tax_rate: number.tax_rate,
        sub_total: subtotal,
        tax_total: number.tax_total.toFixed(2),
        total: number.total.toFixed(2)

    }
    let auth = {
        username: 'user',
        password: 'token'
    }
    await axios.post('https://deft-cove-227620.appspot.com/api/order', null, {
        auth,
        params

    }).then(response => {
        if (response.data.status_code === 0) {
            console.log(response.data.status_message);
        } else {
            console.log(response.data.status_message);
        }
 }).catch(error => {
        console.log(error);
    });

}

