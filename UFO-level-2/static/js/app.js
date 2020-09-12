// from data.js
var tableData = data;
var tbody = d3.select('#ufo-table').select('tbody');
var form = d3.select('form');
var input_date = d3.select('#datetime').node();
var button_filter = d3.select('#filter-btn');
var list_country = d3.select('#ufocountry');
var list_state = d3.select('#ufostate');
var list_city = d3.select('#ufocity');
var list_shape = d3.select('#ufoshape');


function isDate(param){
    let dp = new Date(param);
    let rt = false;

    if(!isNaN(dp) && (param.trim().length>5)){
        rt=true;
    }
    return rt;
}

function displayData(){
    let sdatetime = input_date.value;
    let scountry = list_country.node().value;
    let sstate = list_state.node().value;
    let scity = list_city.node().value;
    let sshape = list_shape.node().value;
    let filtered_data = tableData;

    if(isDate(sdatetime)){
        let inputdate = new Date(sdatetime);
        let strInputDate = `${inputdate.getMonth() + 1}/${inputdate.getDate()}/${inputdate.getFullYear()}`;
        filtered_data = filtered_data.filter(fdata => fdata.datetime == strInputDate);
    }
    if(scountry.trim().length != 0){
        filtered_data = filtered_data.filter(fdata => fdata.country == scountry);
    }
    if(sstate.trim().length != 0){
        filtered_data = filtered_data.filter(fdata => fdata.state == sstate);
    }
    if(scity.trim().length != 0){
        filtered_data = filtered_data.filter(fdata => fdata.city == scity);
    }
    if(sshape.trim().length != 0){
        filtered_data = filtered_data.filter(fdata => fdata.shape == sshape);
    }

    tbody.selectAll('tr').remove();
    filtered_data.forEach(fData =>{
        let row = tbody.append('tr');
        Object.entries(fData).forEach(([key, value])=>{
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
    if (isDate(idate) || idate.trim().length==0){
        displayData();
    }else{
        tbody.selectAll('tr').remove();
        tbody.append('tr').append('td').text('Invalid Date Format!');
    }
}

function listCountryFilter(){
    let scountry = list_country.node().value;
    let filtered_data = tableData.filter(tdata => tdata.country == scountry);

    let filtered_state = [...new Set(filtered_data.map(fdata => fdata.state))].sort();
    let list_state = d3.select('#ufostate');
    list_state.selectAll('.opt_state').remove();
    filtered_state.forEach(fState => {
        let opt_state = list_state.append('option');
        opt_state.attr('class', 'opt_state');
        opt_state.attr('value', fState);
        opt_state.text(fState);
    })
    listStateFilter();
}

function listStateFilter(){
    let scountry = list_country.node().value;
    let sstate = d3.select('#ufostate').node().value;
    let filtered_data = tableData.filter(tdata => tdata.country == scountry && tdata.state == sstate);

    let filtered_city = [...new Set(filtered_data.map(fdata => fdata.city))].sort();
    let list_city = d3.select('#ufocity');
    list_city.selectAll('.opt_city').remove();
    filtered_city.forEach(fCity => {
        let opt_city = list_city.append('option');
        opt_city.attr('class', 'opt_city')
        opt_city.attr('value', fCity);
        opt_city.text(fCity);
    })
}


list_country.on('change', ()=>{
    listCountryFilter();
    displayData();
})
list_state.on('change', ()=>{
    listStateFilter()
    displayData();
})
list_city.on('change', displayData)
list_shape.on('change', displayData)
button_filter.on('click', ()=>eventRunner(input_date.value))
form.on('submit', ()=>{
    d3.event.preventDefault();
    eventRunner(input_date.value)
})


var countryArr = [...new Set(tableData.map(tdata => tdata.country))].sort();
countryArr.forEach(cArray =>{
    let opt_country = list_country.append('option');
    opt_country.attr('value', cArray);
    opt_country.text(cArray);
})
var shapeArr = [...new Set(tableData.map(tdata => tdata.shape))].sort();
shapeArr.forEach(sArray =>{
    let opt_shape = list_shape.append('option');
    opt_shape.attr('value', sArray);
    opt_shape.text(sArray);
})

displayData();