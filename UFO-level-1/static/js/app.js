// from data.js
var tableData = data;
var tbody = d3.select('#ufo-table').select('tbody');
var form = d3.select('form');
var input_date = d3.select('#datetime').node();
var button_filter = d3.select('#filter-btn');


function isDate(param){
    let dp = new Date(param);
    let rt = false;

    if(!isNaN(dp) && (param.trim().length>5)){
        rt=true;
    }
    return rt;
}

function displayData(tableData){
    tbody.selectAll('tr').remove();
    tableData.forEach(tData =>{
        let row = tbody.append('tr');
        Object.entries(tData).forEach(([key, value])=>{
            let cell = row.append('td');
            cell.text(value);
            if(key=='country'){
                cell.attr('class', 'table_country_cell');
            }
            if(key=='state'){
                cell.attr('class', 'table_state_cell');
            }
            if(key=='city'){
                cell.attr('class', 'table_city_cell');
            }
        })
    })
}

function eventRunner(idate){
    if (isDate(idate)){
        let inputdate = new Date(idate);
        let strInputDate = `${inputdate.getMonth() + 1}/${inputdate.getDate()}/${inputdate.getFullYear()}`;
        let filtered_data = tableData.filter(tdata => tdata.datetime == strInputDate);

        displayData(filtered_data);
    }else if(idate.trim().length == 0){
        displayData(tableData);
    }else{
        tbody.selectAll('tr').remove();
        tbody.append('tr').append('td').text('Invalid Date Format!');
    }
}


button_filter.on('click', ()=>eventRunner(input_date.value))
form.on('submit', ()=>{
    d3.event.preventDefault();
    eventRunner(input_date.value)
})


displayData(tableData);