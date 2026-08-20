import type { BlogBlock } from "@/lib/blog";

export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="article mt-10">
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return <p key={index}>{block.text}</p>;
        }
        if (block.type === "h2") {
          return (
            <h2 key={block.id} id={block.id}>
              {block.text}
            </h2>
          );
        }
        return (
          <ul key={index}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
