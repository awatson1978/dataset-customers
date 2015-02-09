**datasets-customers** is a Meteorite package for populating a CustomerAccounts collection with 500 sample customer names and addresses.


------------------------
### Installation

First, install the datasets-customers package from the command line, like so:

````
meteor add awatson1978:datasets-customers
````


------------------------
### Default Customer Schema  

The user objects are have a fairly simple document schema that looks like the following:
````js
{
  FirstName:   String,
  LastName:  String,
  FullName: String,
  Company:  String,
  Address:  String,
  City:  String,
  County:  String,
  State:  String,
  ZIP:  String,
  Phone:  String,
  Fax:  String,
  Email:  String,
  Web:  String,
  Password:  String,
  Datetime:  Date,
  Birthday:  Date,
  Month: Integer,
  Week: Integer,
  Time:  String,
  Number:  Number,
  Color:  String
}
````

------------------------
### Data/Document Model for Reading Data from Collection

Once done, you'll want to display data from the collection by adding the following templates into your document model. The class names come from Bootstrap v3.

````html
<template name="customersListTemplate" class="with-bottom-spacer">
  <div class="padded">
    <div class="panel panel-info">
      <div class="panel-heading">
          <input id="customerSearchInput"type="text" placeholder="Filter..."></input>
      </div>
      <ul class="list-group">
        {{#each customersList}}
        {{> customersListItemTemplate }}
        {{/each}}
      </ul>
    </div>
  </div>
</template>
<template name="customersListItemTemplate">
  <li class="list-group-item">{{FirstName}} {{LastName}}</li>
</template>
````



------------------------
### Controller for Reading Data from Collection

To dislay data, you'll also need to add the controllers, like so:

````js
//-------------------------------------------------------------
// A.  Generate Index
Template.customersListTemplate.helpers({
  customersList = function(){
    return CustomerAccounts.find({
        $or: [
            {'FirstName': { $regex: Session.get('account_search_term'), $options: 'i' }},
            {'LastName':  { $regex: Session.get('account_search_term'), $options: 'i' }}
        ]
    },{limit: 10});
  }  
});

````


------------------------
### Licensing

MIT License. Use as you wish, including for commercial purposes.
