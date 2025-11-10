function List({ list }) {
  return (
    <main>
      <ul>
        {list.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </main>
  );
}

export default List;
