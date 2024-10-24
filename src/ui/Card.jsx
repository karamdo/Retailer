export default function Card({ id }) {
    return (
        <div
            key={id}
            className="h-96 w-64 shrink-0 rounded-lg border border-stone-400 bg-base-200 p-4 hover:bg-base-300"
        >
            Card
        </div>
    );
}
