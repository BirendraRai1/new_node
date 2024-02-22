// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

let updated_By = "65c07170dc158ea897839441";

let data =  [
    {
      "sub_category_type": "Table Linen",
      "child_category_type": "Dining Room Towels",
      "isActive": true,
      "updated_By": {
        "userID": "65c07170dc158ea897839441"
      },
      "sub_category_id": "65c099eb15ef037526587451"
    }
  ]
    
    let jsonData =  data.map((d)=>({...d,"updated_By":updated_By}))
    
    console.log(jsonData)