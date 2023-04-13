
const mask = document.querySelector('.mask');

    window.addEventListener('load', () => {
        mask.classList.add('visually-hidden');
        setTimeout(() => {
            mask.remove(); 
        }, 600);
    })


export default mask;