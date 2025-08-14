document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.querySelector('.modal');
    const modalInstance = new bootstrap.Modal(modalElement,{
        backdrop: 'static',
        keyboard: false
    });
    modalInstance.show();
    const turnstileWidget = turnstile.render('.turnstile', {
        sitekey: '0x4AAAAAABrvPEVbxJhK_XYd',
        callback(token) {
            modalInstance.hide();
        }
    });
});