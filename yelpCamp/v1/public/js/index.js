console.log('we are connected...');

document.querySelector('button.navbar-toggler').addEventListener('click' ,(e) => {
    console.log('you click the btn');
    document.querySelector('.collapse.navbar-collapse').classList.toggle('show');
});