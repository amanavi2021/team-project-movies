import YouTubeIframeLoader from 'youtube-iframe';
import apiService from './apiService';
import refs from './service/refs';
import catchError from './service/catcherror';

export default async function onClickPlayer(event) {
// console.log('function onClickPlayer(event.target)', event.target);

// перевіряємо, що клік саме по  кнопці play
    if (!event.target.classList.contains('trailer-player-btn') 
        && !event.target.closest('svg, path') 
        || event.target.matches('[data-modal-close]') 
        || event.target.matches('.modal__close-icon')
        || event.target.matches('.modal__close-path')
        )
        {
    return;
}
//  
    let playerContainer = document.querySelector('.trailer-player-container');
// const currentFilmId = event.target.closest('img').dataset.id; не розумію чому так не працює
    const currentFilmId = event.target.closest('[data-btn]').querySelector('img').dataset.id;
// console.log('currentFilmId', currentFilmId);

// по ID фільму фечимо трейлер з API
    apiService.filmID = currentFilmId;
    const trailerData = await apiService.fetchTrailerByID();
// console.log('trailerData', trailerData);    
   
// запускаємо YouTubePlayer по ID трейлера , якщо він 
    try {
        const videoKey = trailerData.results[0].key
    
        refs.trailerWrapper.classList.remove('none');
    
        const videoPlayer = document.createElement('div');
        videoPlayer.setAttribute('id', 'youtube-iframe');
        playerContainer.appendChild(videoPlayer);

        refs.body.style.overflow = 'hidden';
        createYouTubePlayer(videoKey);

// якщо щось піде не так, буде меседж Sorry, no trailer 
    } catch (error) {
            catchError(error, 'Sorry, no trailer found...');
    };


// функція створює YouTubePlaye різного розміру в залежності від  екрану
    function createYouTubePlayer(videoKey) {
    
        const windowWith = window.innerWidth; 

        try {

            if (windowWith < 768) {
                YouTubeIframeLoader.load(function (YT) {
                    new YT.Player('youtube-iframe', {
                        height: '180',
                        width: '320',
                        videoId: videoKey,
                        playerVars: {
                            autoplay: 1,
                            controls: 1,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3,
                        },
                    });
                })
            } else if (windowWith < 1280) {
                YouTubeIframeLoader.load(function (YT) {
                    new YT.Player('youtube-iframe', {
                        height: '432',
                        width: '768',
                        videoId: videoKey,
                        playerVars: {
                            autoplay: 1,
                            controls: 1,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3,
                        },
                    });
                })
            } else {
                YouTubeIframeLoader.load(function (YT) {
                    new YT.Player('youtube-iframe', {
                        height: '720',
                        width: '1280',
                        videoId: videoKey,
                        playerVars: {
                            autoplay: 1,
                            controls: 1,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3,
                        },
                    });
                })
            }
// закриваємо плейєр по EscKey чи кліку не по відео
            document.addEventListener('click', onWindowClick);
            window.addEventListener('keydown', onEscKeyPress);
        } catch (error) {
            catchError(error, 'Sorry, no trailer found...');
        }
    };

    function onEscKeyPress(event) {
        if (event.code !== 'Escape') {
            return
        } 
        stopVideo();
    }
    
    function onWindowClick(event) {
        const target = event.target;
        if (!refs.playerContainer.contains(target) || target.classList.contains('trailer-player-wrapper')) {
            stopVideo()
        };
    }
    function stopVideo() {
            document.removeEventListener('click', onWindowClick);
            window.removeEventListener('keydown', onEscKeyPress);
            playerContainer.remove();
            refs.trailerWrapper.classList.add('none');
            playerContainer = document.createElement('div');
            playerContainer.classList.add('trailer-player-container');
            refs.trailerWrapper.appendChild(playerContainer);
            
            refs.body.style.overflow = '';
            
           
    }
 };