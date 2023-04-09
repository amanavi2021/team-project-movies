export default function pageHeaderAutoSize() {
    const { height: pageHeaderHeight } = document
        .querySelector('.header')
        .getBoundingClientRect();
    document.body.style.paddingTop = `${pageHeaderHeight}px`;
};