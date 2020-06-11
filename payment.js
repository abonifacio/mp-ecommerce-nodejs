var mercadopago = require('mercadopago');


mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});

function make({ title, price, quantity, image, host }) {
    console.log(host + image);
    const payer = {
        name: 'Lalo',
        surname: 'Landa',
        email: 'test_user_63274575@testuser.com',
        phone: {
            area_code: '11',
            number: 22223333,
        },
        address: {
            street_name: 'False',
            stree_number: 123,
            zip_code: '1111',
        }
    };
    const items = [
        {
            id: '1234',
            picture_url: 'https://'+host + image,
            title,
            description: 'Dispositivo móvil de Tienda e-commerce',
            category_id: '',
            currency_id: 'ARS',
            quantity,
            unit_price: price
        }
    ]
    const preference = {
        payer,
        payment_methods: {
            installments: 6,
            excluded_payment_methods: [{id: 'amex'}],
            excluded_payment_types: [{id: 'atm'}],
        },
        notification_url: `https://${host}/notifications`,
        back_urls: {
            success: `https://${host}/success`,
            pending: `https://${host}/pending`,
            failure: `https://${host}/failure`,
        },
        auto_return: 'approved',
        external_reference: 'augusto.bonifacio95@gmail.com',
        items,
    };
    return mercadopago.preferences.create(preference);
}

module.exports = {
    make
}