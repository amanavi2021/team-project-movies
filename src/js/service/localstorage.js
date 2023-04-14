import catchError from './catcherror';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    catchError(error , 'Something went wrong with LocalStorage');
  }
};

const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    catchError(error , 'Something went wrong with LocalStorage');
  }
};

const remove = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
    catchError(error , 'Something went wrong with LocalStorage');
  }
}

export default {
  save,
  load,
  remove,
};