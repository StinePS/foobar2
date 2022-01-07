export default function NowServing({ serving }) {
  return (
    // Map over each item in "serving" and create an article for each
    <div className="flex-wrap">
      {serving?.map((serving) => (
        <article key={serving.id}>
          <h3 className="terti-bg sec-txt order-numbers">{serving.id}</h3>
        </article>
      ))}
    </div>
  );
}
