export default function TrendingBox() {
  return (
    <div className="bg-primary rounded-sm p-4">
      <h3 className="font-bold mb-2">Trending Topics</h3>
      <div className="flex flex-wrap gap-1">
        <span className="text-xs px-2 py-1 bg-accent rounded">Tag1</span>
        <span className="text-xs px-2 py-1 bg-accent rounded">Tag2</span>
        <span className="text-xs px-2 py-1 bg-accent rounded">Tag3</span>
      </div>
    </div>
  );
} 