document.addEventListener('DOMContentLoaded', function(){
    const $burgerNav = document.querySelector('.navbar-burger');

    $burgerNav.addEventListener('click', function(){
        this.classList.toggle('is-active');
        document.querySelector('.navbar-menu').classList.toggle('is-active');
    });
});