import notifier from './notifier'

export default function catchError(error, message) {
    notifier.error(message);
    console.error('Error stack: ', error.stack);
    };
