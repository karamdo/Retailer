import Card from "./Card";

export default function Slider() {
    return (
        <div className="flex-cols flex gap-2">
            {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                <div key={i} className="carousel-item">
                    <Card />
                </div>
            ))}
        </div>
    );
}
