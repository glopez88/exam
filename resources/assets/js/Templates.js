const uuidv1 = require('uuid/v1');

const templates = {

    phoneGroup() {
        let index = uuidv1().split("-")[0];

        return `
            <div class="phone-group">
                <div class="form-row my-3">
                    <div class="col">
                        <input type="text" class="form-control" name="contact[${index}][number]" placeholder="Number">
                    </div>
                    <div class="col">
                        <select name="contact[${index}][type]" class="form-control">
                            <option value="" disabled selected>Type</option>
                            <option value="home">Home</option>
                            <option value="cell">Cell</option>
                            <option value="fax">Fax</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </div>`;
    },

    emailGroup() {
        let index = uuidv1().split("-")[0];

        return `<div class="email-group">
            <div class="form-row my-3">
                <div class="col">
                    <input type="text" class="form-control" name="emails[${index}]" placeholder="Type email address...">
                </div>
            </div>
        </div>`;
    },

    addressGroup() {
        let index = uuidv1().split("-")[0];

        return `<div class="card address-group mt-1">
            <div class="card-body">
                <div class="form-row my-3">
                    <div class="col">
                        <input type="text" class="form-control" name="address[${index}][street]" placeholder="Street" />
                    </div>
                </div>
                <div class="form-row my-3">
                    <div class="col">
                        <input type="text" class="form-control" name="address[${index}][city]" placeholder="City" />
                    </div>
                </div>
                <div class="form-row my-3">
                    <div class="col">
                        <input type="text" class="form-control" name="address[${index}][state]" placeholder="State" />
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" name="address[${index}][country]" placeholder="Country" />
                    </div>
                </div>
                <div class="form-row my-3">
                    <div class="col">
                        <input type="text" class="form-control" name="address[${index}][postal_code]" placeholder="Postal Code" />
                    </div>
                    <div class="col">
                        <select name="address[${index}][type]" class="form-control">
                            <option value="" disabled selected>Type</option>
                            <option value="primary">Primary Home</option>
                            <option value="secondary">Secondary Home</option>
                            <option value="work">Work</option>
                            <option value="mailing">Mailing Address</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>`;
    },

    paginate(paging) {
        let current = paging.currentPage;
        let last = paging.lastPage;
        let delta = 2;
        let left = current - delta;
        let right = current + delta + 1;
        let range = [];
        let rangeWithDots = [];
        let l;
        let html = '';

        for (let i = 1; i <= last; i++) {
            if (i == 1 || i == last || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }
        
        if(rangeWithDots.length > 1) {
            html += '<nav aria-label="Pagination">';
            html += '<ul class="pagination">';

            if(paging.prevPageUrl) {
                html += `<li class="page-item"><a class="page-link" href="${paging.prevPageUrl}">Previous</a></li>`;
            }

            for(let i = 0; i < rangeWithDots.length; i++) {
                if(rangeWithDots[i] == '...') {
                    html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
                } else {
                    if(paging.currentPage == rangeWithDots[i]) {
                        html += ` <li class="page-item active" aria-current="page">
                            <span class="page-link">
                                ${paging.currentPage}
                                <span class="sr-only">(current)</span>
                            </span>
                            </li>`;
                    } else {
                        html += `<li class="page-item"><a class="page-link"
                        href="${paging.baseUrl}?page=${rangeWithDots[i]}">
                        ${rangeWithDots[i]}</a></li>`;
                    }

                }
            }

            if(paging.nextPageUrl) {
                html += `<li class="page-item"><a class="page-link" href="${paging.nextPageUrl}">Next</a></li>`;
            }

            html += '</ul>';
            html += '</nav>';
        }

        return html;
    },

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    contactInfo(contact) {
        let getAddressTypeName = (code) => {
            let name = this.capitalize(code);

            switch(code) {
                case "primary":
                case "secondary":
                    return name + " Home";
                break;

                case "work":
                    return name;
                break;

                case "mailing":
                    return name + " Address"
                break;
            }
        };

        let html = `
        <div>
            <h5>Personal Info</h5>
            <p class="mb-0"><strong>Name</strong>: ${contact.first_name} ${contact.last_name}</p>
            <p class="mb-0"><strong>Company</strong>: ${contact.company || ""}</p>
            <p class="mb-0"><strong>Notes</strong>:</p>
            <p class="mb-0">${contact.notes}</p>
        </div>
        <hr/>
        `;

        html += '<div class="mt-2"><h5>Contact Number</h5>';
        for(let i = 0; i < contact.phones.length; i++) {
            html += `<div class="mb-3"><p class="mb-0"><strong>Number</strong>: ${contact.phones[i].number}</p>
                <p class="mb-0"><strong>Type</strong>: ${contact.phones[i].type} </p>
                </div>`;

        }
        html += '</div><hr/>';

        html += '<div class="mt-2"><h5>Email</h5>';
        html += '<p class="mb-0">';
        for(let i = 0; i < contact.emails.length; i++) {
            html += contact.emails[i].email;

            if(i < (contact.emails.length-1)) {
                html += ', ';
            }
        }
        html += '</p>';
        html += '</div><hr/>';

        html += '<div class="mt-2"><h5>Address</h5>';
        for(let i = 0; i < contact.addresses.length; i++) {
            html += `
                <div class="mb-3">
                    <p class="mb-0"><strong>Address</strong>: ${contact.addresses[i].street}, ${contact.addresses[i].city}, ${contact.addresses[i].state}, ${contact.addresses[i].postal_code}, ${contact.addresses[i].country}</p>
                    <p class="mb-0"><strong>Type</strong>: ${getAddressTypeName(contact.addresses[i].type)}</p>
                </div>
            `;
        }

        html += '</div>';

        return html;
    },

    addContactForm() {
        let html = `<div id="add-contact-form-cont" class="mt-4">
            <form id="add-contact-form" novalidate>
                <p><strong>Personal Info</strong>:</p>

                <div class="form-row my-3">
                    <div class="col">
                        <input type="text" class="form-control" name="first_name" placeholder="First Name">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" name="last_name" placeholder="Last Name">
                    </div>
                </div>

                <div class="form-row my-3">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Company">
                    </div>
                </div>

                <div class="form-row my-3">
                    <div class="col">
                        <textarea name="notes" class="form-control" placeholder="type notes here..."></textarea>
                    </div>
                </div>

                <p><strong>Contact Info</strong>:</p>
                <div class="phone-groups">
                    <div class="phone-group">
                        <div class="form-row my-3">
                            <div class="col">
                                <input type="text" class="form-control" name="contact[0][number]" placeholder="Number">
                            </div>
                            <div class="col">
                                <select name="contact[0][type]" class="form-control">
                                    <option value="" disabled selected>Type</option>
                                    <option value="home">Home</option>
                                    <option value="cell">Cell</option>
                                    <option value="fax">Fax</option>
                                    <option value="work">Work</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <p><a href="" class="more-number">+add more number</a></p>


                <div class="email-groups">
                    <div class="email-group">
                        <div class="form-row my-3">
                            <div class="col">
                                <input type="text" class="form-control" name="emails[0]" placeholder="Type email address...">
                            </div>
                        </div>
                    </div>
                </div>
                <p><a href="" class="more-email">+add more email</a></p>

                <div class="address-groups">
                    <div class="card address-group">
                        <div class="card-body">
                            <div class="form-row my-3">
                                <div class="col">
                                    <input type="text" class="form-control" name="address[0][street]" placeholder="Street" />
                                </div>
                            </div>
                            <div class="form-row my-3">
                                <div class="col">
                                    <input type="text" class="form-control" name="address[0][city]" placeholder="City" />
                                </div>
                            </div>
                            <div class="form-row my-3">
                                <div class="col">
                                    <input type="text" class="form-control" name="address[0][state]" placeholder="State" />
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" name="address[0][country]" placeholder="Country" />
                                </div>
                            </div>
                            <div class="form-row my-3">
                                <div class="col">
                                    <input type="text" class="form-control" name="address[0][postal_code]" placeholder="Postal Code" />
                                </div>
                                <div class="col">
                                    <select name="address[0][type]" class="form-control">
                                        <option value="" disabled selected>Type</option>
                                        <option value="primary">Primary Home</option>
                                        <option value="secondary">Secondary Home</option>
                                        <option value="work">Work</option>
                                        <option value="mailing">Mailing Address</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p><a href="" class="more-address">+add more address</a></p>


                <input type="hidden" name="user_id" />
            </form>
        </div>`;

        return html;
    },

    editContactForm(contact) {
        let html = `
        <form id="edit-contact-form" novalidate>
            <p><strong>Personal Info</strong>:</p>

            <div class="form-row my-3">
                <div class="col">
                    <input type="text" class="form-control" name="first_name" placeholder="First Name" value="${contact.first_name}">
                </div>
                <div class="col">
                    <input type="text" class="form-control" name="last_name" placeholder="Last Name" value="${contact.last_name}">
                </div>
            </div>

            <div class="form-row my-3">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Company" value="${contact.company || ""}">
                </div>
            </div>

            <div class="form-row my-3">
                <div class="col">
                    <textarea name="notes" class="form-control" placeholder="type notes here...">${contact.notes || ""}</textarea>
                </div>
            </div>

            <p><strong>Contact Info</strong>:</p>
            <div class="phone-groups">`;

            for(let i = 0; i < contact.phones.length; i++) {
                html += `<div class="phone-group">
                    <div class="form-row my-3">
                        <div class="col">
                            <input type="text" class="form-control" name="contact[${contact.phones[i].id}][number]" placeholder="Number" value="${contact.phones[i].number}">
                        </div>
                        <div class="col">
                            <select name="contact[${contact.phones[i].id}][type]" class="form-control">
                                <option value="home" ${(contact.phones[i].type == "home" ? "selected" : "")}>Home</option>
                                <option value="cell" ${(contact.phones[i].type == "cell" ? "selected" : "")}>Cell</option>
                                <option value="fax" ${(contact.phones[i].type == "fax" ? "selected" : "")}>Fax</option>
                                <option value="work" ${(contact.phones[i].type == "work" ? "selected" : "")}>Work</option>
                                <option value="other" ${(contact.phones[i].type == "other" ? "selected" : "")}>Other</option>
                            </select>
                        </div>
                    </div>
                </div>`;
            }


            html += `</div>
                <p><a href="" class="more-number">+add more number</a></p>
                <div class="email-groups">`;

            for(let i = 0; i < contact.emails.length; i++) {
                html += `<div class="email-group">
                        <div class="form-row my-3">
                            <div class="col">
                                <input type="text" class="form-control" name="emails[${contact.emails[i].id}]" placeholder="Type email address..." value="${contact.emails[i].email}">
                            </div>
                        </div>
                    </div>`;
            }

            html += `</div>
                <p><a href="" class="more-email">+add more email</a></p>
                <div class="address-groups">`;


            for(let i = 0; i < contact.addresses.length; i++) {
                html += `<div class="card address-group">
                    <div class="card-body">
                        <div class="form-row my-3">
                            <div class="col">
                                <input type="text" class="form-control"
                                  name="address[${contact.addresses[i].id}][street]" placeholder="Street" value="${contact.addresses[i].street}" />
                            </div>
                        </div>
                        <div class="form-row my-3">
                            <div class="col">
                                <input type="text" class="form-control" name="address[${contact.addresses[i].id}][city]" placeholder="City" value="${contact.addresses[i].city}" />
                            </div>
                        </div>
                        <div class="form-row my-3">
                            <div class="col">
                                <input type="text" class="form-control" name="address[${contact.addresses[i].id}][state]" placeholder="State" value="${contact.addresses[i].state}" />
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" name="address[${contact.addresses[i].id}][country]" placeholder="Country" value="${contact.addresses[i].country}" />
                            </div>
                        </div>
                        <div class="form-row my-3">
                            <div class="col">
                                <input type="text" class="form-control" name="address[${contact.addresses[i].id}][postal_code]" placeholder="Postal Code" value="${contact.addresses[i].postal_code}"/>
                            </div>
                            <div class="col">
                                <select name="address[${contact.addresses[i].id}][type]" class="form-control">
                                    <option value="primary" ${(contact.addresses[i].type == "primary" ? "selected" : "")}>Primary Home</option>
                                    <option value="secondary" ${(contact.addresses[i].type == "secondary" ? "selected" : "")}>Secondary Home</option>
                                    <option value="work" ${(contact.addresses[i].type == "work" ? "selected" : "")}>Work</option>
                                    <option value="mailing" ${(contact.addresses[i].type == "mailing" ? "selected" : "")}>Mailing Address</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>`;
            }

            html += `</div>
                <p><a href="" class="more-address">+add more address</a></p>
            </form>`;

        return html;
    },

    searchUserForm() {
        return `<div id="search-user-form-cont" class="mt-4">
          <form class="form-inline" id="search-user-form" novalidate>
              <label class="sr-only" for="searchedEmailAddress">Email Address</label>
              <input type="text" class="form-control mb-2 mr-sm-2" id="searchedEmailAddress" name="email" placeholder="type email here...">

              <button type="submit" class="btn btn-primary mb-2">Submit</button>
          </form>
        </div>`;
    }

};

export default templates;
