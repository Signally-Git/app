export const handleScroll = (e, scroll, slider) => {
    e.preventDefault();
    slider.current.scroll({
        top: 0,
        left: scroll,
        behavior: "smooth",
    });
};
