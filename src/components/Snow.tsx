const Snow = () => (
  <div className="snow">
    {Array.from({ length: 40 }).map((_, i) => (
      <span
        key={i}
        className="snowflake"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${5 + Math.random() * 10}s`,
          fontSize: `${10 + Math.random() * 14}px`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      >
        ❄
      </span>
    ))}
  </div>
);

export default Snow;
