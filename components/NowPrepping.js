export default function NowPrepping({ queue }) {
  return (
    // Map over each item in the queue and create an article for each
    <div className="flex-wrap">
      {queue?.map((queue) => (
        <article key={queue.id}>
          <h3 className="terti-bg sec-txt order-numbers">{queue.id}</h3>
        </article>
      ))}
    </div>
  );
}
