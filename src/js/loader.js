const mask = document.querySelector('.mask');

    window.addEventListener('load', () => {
        console.log("done");
        mask.classList.add('visually-hidden');
        setTimeout(() => {
            mask.remove(); 
        }, 600);
    })


export default mask;