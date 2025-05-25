export default function RelatedArticlesBox() {
  return (
    <div className="bg-primary rounded-sm p-4">
      <h3 className="font-bold mb-2">Related Articles</h3>
      <div className="space-y-2">
        <div className="text-sm hover:text-accent cursor-pointer">Similar Topic 1</div>
        <div className="text-sm hover:text-accent cursor-pointer">Similar Topic 2</div>
        <div className="text-sm hover:text-accent cursor-pointer">Similar Topic 3</div>
      </div>
    </div>
  );
} 