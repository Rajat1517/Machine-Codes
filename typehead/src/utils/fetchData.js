const master = [
  "Data1",
  "Data2",
  "Data3",
  "Data4",
  "Data5",
  "Data6",
  "Data7",
  "Data8",
  "Data9",
  "Data10",
  "Data11",
  "Data12",
  "Data13",
  "Data14",
  "Data15",
  "Data16",
  "Data17",
  "Data18",
  "Data19",
  "Data20",
  "Data21",
  "Data22",
  "Data23",
];

export default async function fetchData(filter) {
  return new Promise((res) => {
    filter = filter.trim();
    console.log("filter",filter);
    setTimeout(() => {
      if (filter === "") res([]);
      else res(master.filter((item) =>
        item.toLowerCase().includes(filter.toLowerCase())
      ));
    }, 400);
  });
}
