export const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 3, // optional, default to 1.
    },
    midTablet: {
        breakpoint: { max: 1200, min: 768 },
        items: 3,
    },
    smallTablet: {
        breakpoint: { max: 768, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};
