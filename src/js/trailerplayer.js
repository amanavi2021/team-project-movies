import YouTubeIframeLoader from 'youtube-iframe';
import apiService from './apiService';
import refs from './service/refs';

export default async function onClickPlayer(event) {
    const playerContainer = document.querySelector('.trailer-player-container');
    const trailerWrapper = document.createElement('div');
    trailerWrapper.classList.add('trailer-player-wrapper');
    playerContainer.parentNode.insertBefore(trailerWrapper, playerContainer);
    trailerWrapper.appendChild(playerContainer);

    const currentFilmId = event.target.closest('.film-card').querySelector('.film-card__small-image').dataset.id;
    
    apiService.filmID = currentFilmId;

    const trailerData = await apiService.fetchTrailerByID();
    console.log(trailerData);
    const videoKey = trailerData.results[0].key // нужно добавить проверку
    

    const videoPlayer = document.createElement('div');
    videoPlayer.setAttribute('id', 'youtube-iframe');
    playerContainer.appendChild(videoPlayer);

    refs.body.style.overflow = 'hidden'; 


    function windowClick (event)  {
        const target = event.target;
        if (!playerContainer.contains(target) || target.classList.contains('trailer-player-wrapper')) {
            trailerWrapper.remove();

            const playerContainer = document.createElement('div');
            playerContainer.classList.add('trailer-player-container');
            refs.filmsContainer.appendChild(playerContainer);
            
            refs.body.style.overflow = '';
            
            document.removeEventListener('click', windowClick);
            
        }
    };
            
    YouTubeIframeLoader.load(function(YT) {
        new YT.Player('youtube-iframe', {
        height: '360',
        width: '640',
        videoId: videoKey,
        playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
        },
        }
        
        );
        document.addEventListener('click', windowClick);
  }, {origin: 'http://localhost:1234'});
}

  