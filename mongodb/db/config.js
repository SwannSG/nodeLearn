uri = {
    prefix: 'mongodb',
    ip_address: 'localhost',
    port: 27017,
    database: 'db1',
    uri_string: function() {return this.prefix + '://' + this.ip_address + ':' + this.port +'/' + this.database},
    uri: 'mongodb://localhost:27017/db1'
};

module.exports = {
    uri: uri
}
