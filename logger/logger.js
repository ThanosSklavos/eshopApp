// const winston = require('winston');
// require("winston-daily-rotate-file")

// const logger = winston.createLogger ({
//      level: "debug",
//      format: winston.format.json(),
//      //transports: [new winston.transports.Console()]  //for logging in console log
//      transports: [new winston.transports.File({filename: "logs/error.log"})] //for logging in file
// })

// module.exports = logger


// ------------------------------------------------------------------------------------------------

const {format, transports, createLogger} = require('winston');    // methods of winston inside {}
require("winston-daily-rotate-file")
require("winston-mongodb")
require("dotenv").config();

const {combine, timestamp, label, printf, prettyPrint} = format;
const CATEGORY = "winston custom fomat"
// const customFormat = printf(
//     ({level, message, label, timestamp}) => {
//         return `${timestamp} [${label}], ${level}: ${message}`;
//     }
// )

const fileRotateTransport = new transports.DailyRotateFile({
    filename: "logs/rotate-%Date%.log",
    datePattern:"DD-MM-YYYY",
    maxFiles:"14d"
})

const logger = createLogger ({
     level: "debug",
     format: combine(
        label({label: CATEGORY}),
        timestamp({
            format: "DD-MM-YYYY HH:mm:ss"
        }),
        //format.json()
        prettyPrint()
     ),
     transports: [
        fileRotateTransport,
        new transports.File({
            filename: "logs/example.log"
        }),
        new transports.File({
            level: "error",
            filename: "logs/error/log"
        }),
        new transports.Console(),
        new transports.MongoDB({
            level: "error",
            db: process.env.MONGODB_URI,
            options: {
                useUnifiedTopology: true
            },
            collection: 'server_logs',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
     ]
     
})

module.exports = logger