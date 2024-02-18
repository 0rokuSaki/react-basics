export function AnimalList({
  animalInfos = [
    { type: "Malayan Tiger", count: 787 },
    { type: "Mountain Gorilla", count: 212 },
    { type: "Fin Whale", count: 28 },
  ],
}) {
  return (
    <div className="animal-list">
      <h1>Rare Animals</h1>
      <table>
        <tbody>
          {animalInfos.map((value, index) => {
            const { type, count } = value;
            return (
              <tr key={type}>
                <td>{type}</td>
                <td>{count}</td>
                <td><a href={`https://www.google.com/search?q=${type}`} target="_blank">Search</a></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
