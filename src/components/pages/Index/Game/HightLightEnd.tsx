export const HightLightEnd = ({ ends }: { ends: string[] }) => {
  return (
    <div className="d-flex gap-2 flex-wrap justify-content-center">
      {ends.map((end, i) => (
        <span
          key={`game-${i}`}
          style={{
            backgroundColor: "#1F212A",
            color: "#00A261",
          }}
          className="fs-lg px-2 py-1 rounded select-none"
        >
          {end}
        </span>
      ))}
    </div>
  );
};
