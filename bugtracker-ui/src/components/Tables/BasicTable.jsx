import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom"


const handleOnRowClick = (rowData) => {
  console.log("Clicked on row!")
  console.log(rowData.id)
}

function onRowClick(data) {
  console.log("Row data below!")
  console.log(data)
}

const data = [
  { id: 1, name: "Mohammad", surname: "Faisal", birthYear: 1995 },
  { id: 2, name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
];

const columns = [
  { title: "Id", field: "id", hidden: true},
  { title: "Name", field: "name"  /*, render: row => <div onClick={() => console.log(row.id)}>{row.name}</div> */ },
  { title: "Surname", field: "surname" },
  { title: "Birth Year", field: "birthYear", type: "numeric" },
];

export const BasicTable = () => {
  return <MaterialTable 
    title="Basic Table" 
    columns={columns} 
    data={data} 
    onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)} />
    
};
