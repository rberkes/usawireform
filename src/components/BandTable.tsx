const BAND = [
  { mm: 4, inch: "0.157 in" },
  { mm: 8, inch: "0.315 in" },
  { mm: 12, inch: "0.472 in" },
  { mm: 14, inch: "0.551 in" },
] as const;

export function BandTable({
  heading,
  rows,
}: {
  heading: string;
  rows: Record<4 | 8 | 12 | 14, string>;
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Diameter</th>
          <th>Inch</th>
          <th>{heading}</th>
        </tr>
      </thead>
      <tbody>
        {BAND.map((row) => (
          <tr key={row.mm}>
            <td>{row.mm} mm</td>
            <td>{row.inch}</td>
            <td>{rows[row.mm]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
