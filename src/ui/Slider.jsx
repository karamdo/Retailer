import Card from "./Card";

export default function Slider() {
    return (
        <div className="no-scrollbar flex gap-3 overflow-x-scroll px-5">
            {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                <div
                    key={i}
                    className="bg-base-200 hover:bg-base-300 h-96 w-64 shrink-0 rounded-lg border border-stone-400 p-4"
                >
                    <Card />
                </div>
            ))}
        </div>
    );
}
