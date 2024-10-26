import { useEffect, useState } from "react";

const data = [
    {
        id: 1,
        image: "https://t4.ftcdn.net/jpg/05/47/97/81/360_F_547978128_vqEEUYBr1vcAwfRAqReZXTYtyawpgLcC.jpg",
        title: "Item 1",
    },
    {
        id: 2,
        image: "https://image.shutterstock.com/image-photo/high-mountain-morning-time-beautiful-260nw-1384588922.jpg",
        title: "Item 2",
    },
    {
        id: 3,
        image: "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg",
        title: "Item 3",
    },
    {
        id: 4,
        image: "https://static.vecteezy.com/system/resources/thumbnails/025/284/015/small/close-up-growing-beautiful-forest-in-glass-ball-and-flying-butterflies-in-nature-outdoors-spring-season-concept-generative-ai-photo.jpg",
        title: "Item 4",
    },
    {
        id: 5,
        image: "https://img.freepik.com/premium-photo/earth-crystal-glass-globe-ball-growing-tree-human-hand-generative-ai_704724-1143.jpg?w=2000",
        title: "Item 5",
    },
    {
        id: 6,
        image: "https://media.istockphoto.com/id/1438931606/photo/womans-hand-with-a-tree-she-is-planting-environmental-conservation-concept-protect-and.webp?b=1&s=612x612&w=0&k=20&c=qkiZnwOcwDunV8cnvxFZTEthGGTi8PnNcacRJ94Bifo=",
        title: "Item 6",
    },
    {
        id: 7,
        image: "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_1280.jpg",
        title: "Item 7",
    },
    {
        id: 8,
        image: "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267_640.jpg",
        title: "Item 8",
    },
];

function ReactSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(4);

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const nextSlide = () => {
        if (currentIndex < data.length - visibleCards + visibleCards) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const updateVisibleCards = () => {
        if (window.innerWidth <= 450) {
            setVisibleCards(1);
        } else if (window.innerWidth <= 650) {
            setVisibleCards(2);
        } else if (window.innerWidth <= 1000) {
            setVisibleCards(3);
        } else {
            setVisibleCards(4);
        }
    };

    useEffect(() => {
        updateVisibleCards();
        window.addEventListener("resize", updateVisibleCards);
        return () => {
            window.removeEventListener("resize", updateVisibleCards);
        };
    }, []);

    return (
        <div className="flex w-[100%] items-center justify-center gap-4">
            <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="rounded-full border border-stone-500 bg-slate-300 px-1 text-3xl hover:bg-slate-400"
            >
                &#11164;
            </button>
            {data
                .slice(currentIndex, currentIndex + visibleCards)
                .map((item, id) => (
                    <div
                        key={id}
                        className="flex w-96 flex-col items-center justify-center rounded-md bg-stone-300 p-3"
                    >
                        <img
                            className="h-36 w-full rounded-md"
                            src={item.image}
                            alt={item.title}
                        />
                        <h3>{item.title}</h3>
                    </div>
                ))}
            <button
                onClick={nextSlide}
                disabled={currentIndex === data.length - visibleCards}
                className="rounded-full border border-stone-500 bg-slate-300 px-1 text-3xl hover:bg-slate-400"
            >
                &#11166;
            </button>
        </div>
    );
}

export default ReactSlider;
