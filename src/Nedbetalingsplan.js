import React, {Fragment} from 'react';
import './App.css';
function Nedbetalingsplan({belop, rente, termingebyr, start, slutt, saldoDato}){
    let terminbeloptab = [];
    let datoTab = [];
    let rentepristab = [];
    let tabtab = [terminbeloptab, rentepristab];
    let startdate = new Date(saldoDato);
    let enddate = new Date(slutt);
    let duration = enddate.getTime() - startdate.getTime();
    duration = duration / (2629746000);
    let i = 0;
    var nextDate = new Date(start);
    let avdrag = Math.round(belop/duration);
    for(let months = Math.round(duration);  months > 0; months = months - 1){
        //går ut fra at det er serielån og at renten regnes hver måned
        let rentepris = Math.round(belop*(rente/12)/100);
        rentepristab[months] = rentepris;
        datoTab[months] = nextDate.toLocaleDateString();
        nextDate = new Date( nextDate.setMonth(nextDate.getMonth()+1));
        terminbeloptab[i] = Math.round(avdrag + rentepris + termingebyr);
        belop = (belop - avdrag);
        console.log(belop);
        i = i+1
    }
    let sumBelop = 0;

    return[terminbeloptab.map(belop =>  {
             return(<tr><td> {datoTab.pop()} </td><td> {rentepristab.pop()} kr</td><td>{termingebyr} kr</td>
                 <td> {avdrag} kr </td><td> {belop} kr</td></tr>);

    })
    ];
}
export default Nedbetalingsplan;