import Templates from './Templates';
import Error from './Error';
import FormFeedback from './FormFeedback';
import { find } from 'lodash';

export default class ContactList {
    constructor($table, endpoint) {
        this.endpoint = endpoint;

        this.table = $table;

        this.pagination = $("#contacts-pagination");

        this.paging = {
            lastPage: 0,
            currentPage: 0,
            lastPageUrl: '',
            nextPageUrl: '',
            prevPageUrl: '',
            firstPageUrl: '',
            currPageUrl: this.endpoint
        };

        this.data = [];

        this.idToShow = null;
        this.idToDelete = null;
        this.idToEdit = null;

        this.modals = {
            delete: $("#deleteContactModal"),
            show: $("#showContactInfo"),
            edit: $("#editContactInfo")
        };
    }

    getContacts(url) {
        url = url || this.endpoint;

        this.table.find(".no-contacts").hide();

        return $.ajax({
            method: "GET",
            url: url,
        }).done( response => {
            if(response.status == "success") {
                this.data = response.data.data;
                this.paging.lastPage = response.data.last_page;
                this.paging.currentPage = response.data.current_page;
                this.paging.lastPageUrl = response.data.last_page_url;
                this.paging.nextPageUrl = response.data.next_page_url;
                this.paging.prevPageUrl = response.data.prev_page_url;
                this.firstPageUrl = response.data.first_page_url;
                this.paging.currPageUrl = url;
                this.paging.baseUrl = response.data.path;

                this.pagination.show().html(Templates.paginate(this.paging));
            } else {
                Error.showModal(response.message);
            }

            this.populateTable();
        }).fail( error => {
            Error.showModal('A problem occured while contacting the server. Please try again.');
        }).always( () => {
            if(this.data.length == 0) {
                this.table.find(".no-contacts").show();
                this.pagination.hide();
            }
        });
    }

    populateTable() {
        this.table.find(".no-contacts").hide();
        this.table.find("tbody tr:not(.no-contacts)").remove();

        if(this.data.length > 0) {
            let html = '';
            for(let i = 0; i < this.data.length; i++) {
                html += `<tr id="contact-${this.data[i].id}">
                    <td>${this.data[i].id}</td>
                    <td>${this.data[i].first_name}</td>
                    <td>${this.data[i].last_name}</td>
                    <td>
                        <a href="#" class="show-contact" data-id="${this.data[i].id}">show</a> |
                        <a href="#" class="edit-contact" data-id="${this.data[i].id}">edit</a> |
                        <a href="#" class="delete-contact" data-id="${this.data[i].id}">delete</a>
                    </td>
                </tr>`;
            }

            this.table.find("tbody").append(html)
        } else {
            this.table.find(".no-contacts").show();
        }
    }

    registerEvents() {

        this.table.on("click", ".show-contact", e => {
            e.preventDefault();

            this.idToShow = $(e.currentTarget).data("id");

            this.modals.show.modal('show');
        });

        this.table.on("click", ".edit-contact", e => {
            e.preventDefault();

            this.idToEdit = $(e.currentTarget).data("id");
            this.modals.edit.modal('show');
        });

        this.table.on("click", ".delete-contact", e => {
            e.preventDefault();

            this.idToDelete = $(e.currentTarget).data("id");

            this.modals.delete.modal('show');
        });

        this.modals.show.on("show.bs.modal", e => {
            let $content = $(e.currentTarget);
            let contact = find(this.data, {
                "id": this.idToShow
            });
            let title = `${contact.first_name} ${contact.last_name}`;
            let info = Templates.contactInfo(contact);

            this.modals.show.find(".modal-title").html(title);
            this.modals.show.find(".modal-body").html(info);
        }).on("hide.bs.modal", e => {
            this.idToShow = null;
        });

        this.modals.edit.on("show.bs.modal", e => {
            let $content = $(e.currentTarget);
            let contact = find(this.data, {
                "id": this.idToEdit
            });

            let newContent = Templates.editContactForm(contact);

            this.modals.edit.find(".modal-body").html(newContent);
        }).on("hide.bs.modal", e => {
            this.idToEdit = null;
        });

        this.modals.edit.on("submit", "form#edit-contact-form", e => e.preventDefault );

        this.modals.edit.on("click", "#confirmEdit", e => {
            let data = $("form#edit-contact-form").serialize();

            $.ajax({
                method: "PUT",
                url: `${this.endpoint}/${this.idToEdit}`,
                data: data
            }).then(response => {
                if(response.status === "error" &&
                    response.errors !== undefined) {
                    FormFeedback.onAdd($("#edit-contact-form"), response.errors);
                } else {
                    let contact = response.data;
                    let index = _.findIndex(this.data, {id: this.idToEdit});

                    this.data.splice(index, 1, contact);

                    this.idToEdit = null;
                    this.modals.edit.modal('hide');
                    this.populateTable();
                }
            })
        });

        this.modals.delete.on("click", "#confirmDelete", e => {
            $.ajax({
                method: "DELETE",
                url: `${this.endpoint}/${this.idToDelete}`,
            }).done( response => {
                let url;

                $(`#contact-${this.idToDelete}`).remove();

                if(this.table.find("tbody tr:not(.no-contacts)").length == 0) {
                    url = this.paging.prevPageUrl ? this.paging.prevPageUrl : this.paging.firstPageUrl;
                } else {
                    url = this.paging.currPageUrl;
                }

                return this.getContacts(url);
            }).always( () => {
                this.idToDelete = null;
                this.modals.delete.modal('hide');
            });
        });

        this.pagination.on("click", ".page-link", e => e.preventDefault());

        this.pagination.on("click", ".page-item:not(.active,.disabled):not(.disabled) .page-link:not(.active)", e => {
            let url = e.currentTarget.href;

            e.preventDefault();

            this.getContacts(url);
        });

        $(".page-item:not(.active,.disabled):not(.disabled) .page-link:not(.active)", this.pagination).on("click", () => {

        });
    }

    init() {
        this.getContacts();

        this.registerEvents();
    }

    refreshData() {
        return this.getContacts();
    }
}
