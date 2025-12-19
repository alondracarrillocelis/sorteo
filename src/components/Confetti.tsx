const colors = ['#FFD700', '#FF0000', '#00A86B', '#FFFFFF'];

const Confetti = () => (
  <div className="confetti">
    {Array.from({ length: 80 }).map((_, i) => (
      <span
        key={i}
        className="confetti-piece"
        style={{
          left: `${Math.random() * 100}%`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          animationDuration: `${2 + Math.random() * 3}s`,
          animationDelay: `${Math.random()}s`,
        }}
      />
    ))}
  </div>
);

export default Confetti;
