**datasets-customers** is a Meteorite package for populating a CustomerAccounts collection with 500 sample customer names and addresses.


------------------------
### Installation

First, install the datasets-customers package from the command line, like so:

````
mrt add datasets-customers
````

Alternatively, if you'd like to bypass Atmosphere, and install directly from GitHub, you could update your application's smart.json file, like so:

````
{
  "meteor": {
    "branch": "master"
  },
  "packages": {
    "datasets-customers": {
      "git": "https://github.com/awatson1978/dataset-customers.git"
    }
  }
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

Template.customersListTemplate.customersList = function(){
    try{
        return CustomerAccounts.find({
            $or: [
                {'FirstName': { $regex: Session.get('account_search_term'), $options: 'i' }},
                {'LastName':  { $regex: Session.get('account_search_term'), $options: 'i' }}
            ]
        },{limit: 10});
    }catch(error){
        console.log(error);
    }
};


//-------------------------------------------------------------
// B.  Display Record in Edit Pannel When Clicked

Template.customersListTemplate.events({
    'keyup #customerSearchInput': function(evt,tmpl){
        try{
            //Session.set('user_search_term', $('#customerSearchInput').val());
            Session.set('account_search_term', $('#customerSearchInput').val());
            console.log($('#customerSearchInput').val());
            Meteor.flush();
        }catch(err){
            console.log(err);
        }
    }
});


//-------------------------------------------------------------
// C.  Filter Results When User Enters Search Term

Template.customersListItemTemplate.events({
    'click .list-group-item':function(event, template){
        Session.set('selected_user', this._id);
        Session.set('current_action','view');
        Session.set('global_edit', false);
    }
});


````

------------------------
### CRUD Forms Data/Document Model

Once those pieces are in place, you're ready to implement the rest of the CRUD pattern, by adding a form and buttons for Create, Update, and Delete functions.

````html
<template name="customerFormTemplate">
    {{#if user }}
        {{#with user}}
        <div class="padded">
            <div class="panel panel-info">
                <div class="panel-heading padded">
                    <bold>Customer ID:</bold> {{_id}}
                </div>
                <div class="customer-form">
                    <!-- don't add with-bottom-padding to the first column, so it displays on mobile correctly -->
                    <div class="col col-lg-6">
                        <input id="firstNameInput" type="text" placeholder="First Name" value="{{FirstName}}" {{first_name_enabled}}></input>
                        <label class="smallgray" for="firstNameInput">First Name</label>

                        <input id="companyInput" type="text" placeholder="Company" value="{{Company}}"  {{company_enabled}}></input>
                        <label class="smallgray" for="companyInput">Company</label>

                        <input id="addressInput" type="text" placeholder="Address" value="{{Address}}"  {{address_enabled}}></input>
                        <label class="smallgray" for="addressInput">Address</label>

                        <input id="cityInput" type="text" placeholder="City" value="{{City}}"  {{city_enabled}}></input>
                        <label class="smallgray" for="cityInput">City</label>

                        <input id="phoneInput" type="tel" placeholder="Phone" value="{{Phone}}"  {{phone_enabled}}></input>
                        <label class="smallgray" for="phoneInput">Phone</label>

                        <input id="webInput" type="url" placeholder="Web" value="{{Web}}"  {{web_enabled}}></input>
                        <label class="smallgray" for="webInput">Website</label>
                    </div>
                    <div class="col col-lg-6 ">
                        <input id="lastNameInput" type="text" placeholder="Last Name" value="{{LastName}}"  {{last_name_enabled}}></input>
                        <label class="smallgray" for="lastNameInput">Last Name</label>

                        <input id="countyInput" type="text" placeholder="County" value="{{County}}"  {{county_enabled}}></input>
                        <label class="smallgray" for="countyInput">County</label>

                        <input id="stateInput" type="text" placeholder="State" value="{{State}}"  {{state_enabled}}></input>
                        <label class="smallgray" for="stateInput">State</label>

                        <input id="zipInput" type="text" placeholder="Zip" value="{{ZIP}}"  {{zip_enabled}}></input>
                        <label class="smallgray" for="zipInput">Zip</label>

                        <input id="faxInput" type="tel" placeholder="Fax" value="{{Fax}}"  {{fax_enabled}}></input>
                        <label class="smallgray" for="faxInput">Fax</label>

                        <input id="emailInput" type="email" placeholder="Email" value="{{Email}}"  {{email_enabled}}></input>
                        <label class="smallgray" for="emailInput">Email</label>
                    </div>
                    {{#if isNewTask}}
                    <div class="padded col col-lg-12">
                        <button id="newUserButton" type="button" class="fullwidth btn btn-info" width="100%">Create New User!</button>
                    </div>
                    {{/if}}

                    {{#if isDeletingTask}}
                    <div class="padded col col-lg-12 with-bottom-padding">
                        <div class="alert alert-danger">
                            <h4 class="centered">Are you sure you want to delete this user?</h4>
                            <div class="container">
                                <div class="col col-lg-6">
                                    <button id="deleteUserButton" type="button" class="fullwidth btn btn-danger">Delete</button>
                                </div>
                                <div class="col col-lg-6">
                                    <button id="cancelDeleteButton" type="button" class="fullwidth btn btn-danger">Cancel</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    {{/if}}
                </div>
            </div>
        </div>
        {{/with}}
    {{else}}
        <div class="padded">
            <div class="panel panel-info">
                <div class="panel-heading padded">
                    <bold>Customer ID:</bold> ...
                </div>
                <div class="centered padded customer-form">
                    <h2>Select a record.</h2>
                </div>
            </div>
        </div>
    {{/if}}
</template>
````


------------------------
### CRUD Forms Controller

And when that's in place, you're ready for the final step in implementing the pattern, with the following.

````js


//-------------------------------------------------------------
// D.  Edit Form Helper 

Template.dowjonesFormTemplate.helpers({
    record: function(){
        try{
            if(Session.get('current_action') == 'new'){
                return {"Date":"","Open":"","High":"","Low":"","Close":"","Volume":""};
            }else{
                return DowJones.findOne(Session.get('selected_date'));
            }
        }catch(error){
            console.log(error);
        }
    }
});


//-------------------------------------------------------------
// E. Active Input When Clicked ot Tapped

Template.customerFormTemplate.events({

    //-------------------------------------------------------------
    // 1. Desktop Clicks - Editing

    'click #firstNameInput':function(){
        Session.set('editing_first_name', true);
        Meteor.flush();
    },
    'click #lastNameInput':function(){
        Session.set('editing_last_name', true);
        Meteor.flush();
    },
    // etc, etc, etc...
    //-------------------------------------------------------------
    // 2. Mobile Tabs - Editing

    'mouseout #firstNameInput':function(){
        Session.set('editing_first_name', false);
        Meteor.flush();
    },
    'mouseout #lastNameInput':function(){
        Session.set('editing_last_name', false);
        Meteor.flush();
    }
    // etc, etc, etc...
})



//-------------------------------------------------------------
// F. Submit Input to Mongo (Update)

Template.customerFormTemplate.events(
    okCancelEvents('#firstNameInput',
        {
            ok: function (value) {
                CustomerAccounts.update(Session.get('selected_user'), {$set: { 'FirstName': value }});
                Session.set('editing_first_name', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_first_name', false);
            }
        })
);
// etc, etc, et....


//-------------------------------------------------------------
// G. Determine if Input should be Readonly 

Template.customerFormTemplate.first_name_enabled = function(){
    if(Session.get('global_edit')){
        return "enabled";
    }else if(Session.get('editing_first_name')){
        return "enabled";
    }else{
        return "readonly";
    }
};
// etc, etc, etc...



//-------------------------------------------------------------
// H. Determine if Buttons Should be Displayed

Template.customerFormTemplate.isNewTask = function(){
    try{
        if(Session.get('current_action') == 'new'){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};
Template.customerFormTemplate.isDeletingTask = function(){
    try{
        if(Session.get('current_action') == 'delete'){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};

//-------------------------------------------------------------
// I. Call Server Side New Word Method (New, Delete)


Template.customerFormTemplate.events({
    'click #newUserButton': function(){
        console.log('creating new user...');

        try{

            // TODO:  add validation functions
            if ($('#firstNameInput').val().length) {

                Meteor.call('createNewCustomer', {
                    FirstName: $('#firstNameInput').val(),
                    LastName: $('#lastNameInput').val(),
                    Company: $('#companyInput').val(),
                    Address: $('#addressInput').val(),
                    City: $('#cityInput').val(),
                    County: $('#countyInput').val(),
                    State: $('#stateInput').val(),
                    ZIP: $('#zipInput').val(),
                    Phone: $('#phoneInput').val(),
                    Fax: $('#faxInput').val(),
                    Email: $('#emailInput').val(),
                    Web: $('#webInput').val()

                }, function (error, customer) {
                    console.log('error: ' + error);
                    console.log('customer: ' + customer);
                });
            } else {
                Session.set("createError",
                    "Customer needs a name, or why bother?");
            }
            evt.target.value = '';
            Meteor.flush();
        }catch(err){
            console.log(err);
        }

        Session.set('current_action','view');
    },
    'click #deleteUserButton': function(){
        CustomerAccounts.remove(Session.get('selected_user'));
        Session.set('current_action','view');
    },
    'click #cancelDeleteButton': function(){
        Session.set('current_action','view');
    }
});


````




------------------------
### Licensing

MIT License. Use as you wish, including for commercial purposes.
See license.mit.txt for full details.

------------------------
### Support
Found this package to be useful?  Consider tipping the package maintainer for their time!  

[![Support via Gittip](https://raw.github.com/gittip/www.gittip.com/master/www/assets/gittip.png)](https://www.gittip.com/awatson1978/)  
