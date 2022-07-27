/**
 * USE THIS AS A TEMPLATE FOR CREATING NEW TABLES
 * 
 * 
 */

 import MaterialTable from "material-table";
 import { MTableToolbar } from "material-table";
 import { useNavigate } from "react-router-dom"
 
 /**
  * Gets called when a row is clicked.
  * Takes the data of the row and console logs it.
  * You can use this data to pull id or anything else you want,
  * and use it for other purposes.
  */
 function onRowClick(data) {
   console.log("Row data below!")
   console.log(data)
 }
 

 
 const data = [
   { id: 1, ticket_name: "Fix margins", description: "Make everything more spaced out", priority: "low", complexity: 2 },
   { id: 2, ticket_name: "Fix connection error", description: "The server isn't loading properly, please fix", priority: "high", complexity: 6 },
   { id: 3, ticket_name: "Finish landing page", description: "Make the styling nice and add some cool gifs sayudhuiwahdh  asidhwiuhadhui", priority: "low", complexity: 3 },
 ];
 

 const columns = [
   { title: "Id", field: "id", hidden: true}, 
   { title: "Ticket name", field: "ticket_name"  /*, render: row => <div onClick={() => console.log(row.id)}>{row.name}</div> */ },
   { title: "Description", field: "description" },
   { title: "Priority", field: "priority" },
   { title: "Complexity", field: "complexity", type: "numeric" },
 ];
 
 export const TicketsPageTicketsTable = () => {
   return <MaterialTable 
     title="Tickets" 
     columns={columns} 
     data={data} 
     components={{
        Toolbar: props => (
            <div style={{ backgroundColor: '#e8eaf5' }}>
                
                <MTableToolbar {...props} /> 
                <button>Create Ticket</button>
            </div>
        )
    }}
     onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)} /> 
     
 };