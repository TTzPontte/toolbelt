import React from "react";
import {Table} from "react-bootstrap";

const TFoot = ({ list }) => (
  <tfoot>
    <TRow list={list} tag={"th"} />
  </tfoot>
);
const TRow = ({ list = [], tag = "th" }) => (
  <tr>
    {list.map((item) => (
      <>
        {tag === "th" && <th>{item}</th>}
        {tag === "td" && <td>{item}</td>}
      </>
    ))}
  </tr>
);
const THead = ({ list }) => (
  <thead>
    <TRow list={list} tag={"th"} />
  </thead>
);
const TBody = ({ dataList, headerList }) => (
  <tbody>
    {dataList.map((item) => (
      <tr>
        {headerList.map((i) => (
          <>
            <td>{item[i]}</td>
          </>
        ))}
      </tr>
    ))}
  </tbody>
);

const SimpleTable = ({ itemList }) => {
  const tHeader = Object.keys(itemList[0]);
  return (
    <>
      <div className="table-responsive">
        <Table responsive
          className="table table-bordered"
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <THead list={tHeader} />

          <TFoot />
          <TBody dataList={itemList} headerList={tHeader} />
        </Table>
      </div>
    </>
  );
};

export default SimpleTable;

// const seed = () =>
//   [...Array(35).keys()].map(() => ({
//     Name: Faker.name,
//     Position: Faker.number,
//     Office: Faker.city,
//     Age: Faker.age,
//     Start: Faker.date,
//     Salary: Faker.number
//   }));
