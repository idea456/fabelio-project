const printHello = (req, res, next) => {
    res.status(200).json({
        body: "Hi thereee"
    });
}


module.exports.printHello = printHello;