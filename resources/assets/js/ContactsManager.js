import Templates from './Templates';
import FormFeedback from './FormFeedback';
import ContactList from './ContactList';

export default class ContactsManager {
        constructor() {
            this.endpoints = {
                contacts: "/contacts",
                users: "/users"
            };

            this.selectors = {
                addForm: "#add-contact-form",
                searchForm: "#search-user-form",
                addFormActions: "#addContactModal .modal-body .actions",
                formsContainer: "#addContactModal .modal-body .forms",
                searchFormContainer: "#search-user-form-cont",
                addFormContainer: "#add-contact-form-cont",
                addContactButton: "#addContact",
            };

            this.elements = {
                addModal: $("#addContactModal"),
                addButton: $("#addNewContact"),
                contactList: $("#contact-lists"),
                searchUserButton: $("#searchContact")
            };

            this.contactList = new ContactList(this.elements.contactList, this.endpoints.contacts);
        }

        hideForms() {
            $("#addContactModal .modal-body .actions").show();

            $(this.selectors.addFormContainer).remove();
            $(this.selectors.searchFormContainer).remove();
        }

        resetAddFormValidationState() {
            $(this.selectors.addForm).find(".invalid-feedback").remove();
            $(this.selectors.addForm).find(".is-invalid").removeClass("is-invalid");
        }

        registerEvents() {
            this.elements.addButton.on("click", () => {
                this.hideForms();

                $(this.selectors.addFormActions).hide();
                $(this.selectors.formsContainer).html(Templates.addContactForm());
            });

            this.elements.searchUserButton.on("click", () => {
                this.hideForms();

                $(this.selectors.addFormActions).hide();
                $(this.selectors.formsContainer).html(Templates.searchUserForm());

            });

            this.elements.addModal.on("hidden.bs.modal", () => {
                this.hideForms();
            });

            $("body").on("click", ".more-number", (e) => {
                e.preventDefault();
                let $group = $(e.currentTarget).parents("form").find(".phone-groups");

                $group.append(Templates.phoneGroup());
            });

            $("body").on("click", ".more-email", (e) => {
                e.preventDefault();

                let $group = $(e.currentTarget).parents("form").find(".email-groups");

                $group.append(Templates.emailGroup());
            });

            $("body").on("click", ".more-address", (e) => {
                e.preventDefault();

                let $group = $(e.currentTarget).parents("form").find(".address-groups");

                $group.append(Templates.addressGroup());
            });

            $("body").on("submit", this.selectors.searchForm, e => {
                e.preventDefault();

                $.ajax(this.endpoints.users, {
                    method: "POST",
                    data: $(this.selectors.searchForm).serialize()
                }).done(response => {
                    if(response.status === "error" &&
                        response.message !== undefined) {
                            $(this.selectors.searchForm).parent().append(`<p>${response.message}</p>`);
                    } else {
                        $(this.selectors.searchFormContainer).remove();
                        this.elements.addButton.click();

                        $(this.selectors.addForm).find("input[name='user_id']").val(response.data.id);
                        $(this.selectors.addForm).find("input[name='emails[0]']").val(response.data.email);
                    }
                })
            })

            $("body").on("click", "#addContact", e => {
                let $form = $(this.selectors.addForm);
                let data = $form.serialize();

                this.resetAddFormValidationState();

                $.ajax(this.endpoints.contacts, {
                    data: data,
                    method: "POST"
                }).done( response => {
                    if(response.status === "error" &&
                        response.errors !== undefined) {
                        FormFeedback.onAdd($form, response.errors);
                    } else {
                        this.contactList.refreshData()
                            .then(() => {
                                this.elements.addModal.modal('hide');
                            })

                    }
                });
            });
        }

        init() {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            this.contactList.init();

            this.registerEvents();
        }
}
