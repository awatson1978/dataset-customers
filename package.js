Package.describe({
  summary: "Meteorite package that adds 500 records to a CustomerAccounts collection."
});

Package.on_use(function (api) {
    api.use('standard-app-packages');
    api.add_files('initialize.customers.js', ["client","server"]);
});
