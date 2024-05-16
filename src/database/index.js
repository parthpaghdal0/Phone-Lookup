
const odbc = require('odbc');
const logger = require('node-color-log');

let connection = null;

odbc.connect(`DRIVER={iSeries Access ODBC Driver};SYSTEM=${process.env.DB_HOST};DATABASE=IWSE4S5;UID=${process.env.DB_USERNAME};PWD=${process.env.DB_PASSWORD}`, (error, conn) => {
    if (error) {
        logger.error(error);
        console.error(error)
    }
    else {
        logger.info("Connected to db successfully")
        connection = conn;
    }
});

const extractInfo = async (phone) => {
    if (phone.startsWith("+1"))
        phone = phone.slice(2);

    if (connection === null)
        return null;

    const result = await connection.query('SELECT CAREA1, CPHON1, CAREA2, CPHON2, CAREA3, CPHON3, CSLNAM AS Service, CBLNAM AS Billing, ccmpny, ccust#, CSADR#, CSSDIR, CSSTRT, CSSUFX, CSSDIR2, CSAPT#, CSADR2 FROM IWSE4s5.CUST')

    const res = [];
    for (let i = 0; i < result.length; i ++) {
        const item = result[i];
        if (item.CAREA1 + "" + item.CPHON1 == phone || item.CAREA2 + "" + item.CPHON2 == phone || item.CAREA3 + "" + item.CPHON3 == phone) {
            res.push({
                PHONE1: item.CAREA1 + "" + item.CPHON1,
                PHONE2: item.CAREA2 + "" + item.CPHON2,
                PHONE3: item.CAREA3 + "" + item.CPHON3,
                Service: item.SERVICE,
                Billing: item.BILLING,
                "Customer#": item.CCMPNY + "-" + item['CCUST#'],
                Address: item["CSADR#"] + item.CSSDIR + item.CSSTRT + item.CSSUFX + item.CSSDIR2 + item["CSAPT#"] + item.CSADR2
            })
        }
    }

    return res;
}

module.exports = {
  connection, extractInfo
};