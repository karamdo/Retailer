import Card from "./Card";

export default function Slider() {
    return (
        <div className="flex gap-3 overflow-x-hidden px-5">
            {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                <div
                    key={i}
                    className="h-96 w-64 shrink-0 rounded-lg border border-stone-400 bg-base-200 p-4 hover:bg-base-300"
                >
                    <Card />
                </div>
            ))}
        </div>
    );
}
