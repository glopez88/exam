
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');

import ContactsManager from './ContactsManager';

const manager = new ContactsManager();

manager.init();

/*
import Templates from './templates';
import FormFeedback from './formFeedback';


$(function() {
    const endpoint = "/contacts";

    let Selectors = {
        addModal: $("#addContactModal"),
        addButton: $("#addNewContact"),
        searchUser: $("#searchContact"),
        cancelBtn: $("#cancelAdd"),
        addContact: $("#addContact"),
        addForm: $("#add-contact-form"),
        searchForm: $("#search-user-form-cont form"),
        addFormCont: $("#add-contact-form-cont"),
        searchFormCont: $("#search-user-form-cont"),
        phoneGroups: $("#add-contact-form .phone-groups"),
        emailGroups: $("#add-contact-form .email-groups"),
        addressGroups: $("#add-contact-form .address-groups"),
        moreNmber: $("#add-contact-form .more-number"),
        moreEmail: $("#add-contact-form .more-email"),
        moreAddress: $("#add-contact-form .more-address")
    };

    let Actions = {
        hideForms() {
            Selectors.addFormCont.hide();
            Selectors.searchFormCont.hide();
        },

        resetStates() {
            Selectors.addForm.trigger("reset");
            Selectors.searchForm.trigger("reset");
        },

        resetAddFormValidationState() {
            Selectors.addForm.find(".invalid-feedback").remove();
            Selectors.addForm.find(".is-invalid").removeClass("is-invalid");
        }
    };

    let Initializers = {
        run() {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        }
    };

    Selectors.addButton.on("click", () => {
        Actions.hideForms();

        Selectors.addFormCont.show();
    });

    Selectors.addModal.on("hidden.bs.modal", () => {
        Actions.hideForms();
        Actions.resetStates();
    });

    Selectors.moreNmber.on("click", (e) => {
        e.preventDefault();

        let count = Selectors.phoneGroups.find(".phone-group").length;

        Selectors.phoneGroups.append(Templates.phoneGroup(count));
    });

    Selectors.moreEmail.on("click", (e) => {
        e.preventDefault();

        let count = Selectors.emailGroups.find(".email-group").length;

        Selectors.emailGroups.append(Templates.emailGroup(count));
    });

    Selectors.moreAddress.on("click", (e) => {
        e.preventDefault();

        let count = Selectors.addressGroups.find(".address-group").length;

        Selectors.addressGroups.append(Templates.addressGroup(count));
    });

    Selectors.addContact.on("click", (e) => {
        let data = Selectors.addForm.serialize();

        Actions.resetAddFormValidationState();

        $.ajax(endpoint, {
            data: data,
            method: "POST"
        }).done( response => {
            if(response.status === "error" &&
                response.errors !== undefined) {
                FormFeedback.onAdd(Selectors.addForm, response.errors);
            } else {
                Selectors.addModal.modal('hide');
            }
        });
    });

    Initializers.run();
});

*/
