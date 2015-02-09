Package.describe({
  summary: "Meteorite package that adds 500 records to a CustomerAccounts collection.",

  // update this value before you run 'meteor publish'
  version: "1.0.1",

  // if this value isn't set, meteor will default to the directory name
  name: "awatson1978:dataset-customers",

  // and add this value if you want people to access your code from Atmosphere
  git: "http://github.com/awatson1978/dataset-customers.git"
});

Package.on_use(function (api) {
    api.use('momentjs:moment@2.9.0');
    api.use('standard-app-packages@1.0.4');
    api.add_files('initialize.customers.js', ["client","server"]);
});
