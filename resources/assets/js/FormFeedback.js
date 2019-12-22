let translateKeyToFieldName = (key) => {
    key = key.split(".");

    return key.reduce((prev, curr) => {
        return prev + `[${curr}]`;
    });
};

export default {
    onAdd($form, errors) {
        for(let key in errors) {
            let field_name = translateKeyToFieldName(key);
            let $field = $form.find(`[name="${field_name}"]`);

            if($field.length > 0) {
                $field.addClass("is-invalid");
                $field.parents(".col").append(`<div class="invalid-feedback">${errors[key][0]}</div>`);
            }
        }
    },
    onUpdate() {

    }
};
