export default {
        showModal(message) {
            let $elem = $('#errorModal');
            
            $elem.find("#errorMessage").html(message);
            $elem.modal('show');
        }
};
