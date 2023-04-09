import Notiflix from 'notiflix';

class Notifier {
  constructor() {
    Notiflix.Notify.init({
      // width: '50%',
      opacity: 1,
      fontSize: '14px',
      // position: 'center-top',
      timeout: 1000,
      useIcon: false,
      borderRadius: '3px',
      info: {
      background: '#d7d7d7',
      textColor: '#333',
      },
      warning: {
      background: '#ffa500',
      textColor: '#333',
      },
      success: {
      background: '#d7d7d7',
      textColor: '#333',
      },
      error: {
      background: '#ff3333',
      textColor: '#fff',
      },
    });
  }

  success(message) {
    Notiflix.Notify.success(message);
  }

  warning(message) {
    Notiflix.Notify.warning(message);
  }

  info(message) {
    Notiflix.Notify.info(message);
  }

  error(message) {
    Notiflix.Notify.failure(message);
  }
}

export default new Notifier();
