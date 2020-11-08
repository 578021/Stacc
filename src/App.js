import React, {useState}  from 'react';
import './App.css';
import payload from './payload.json'
import Nedbetalingsplan from './Nedbetalingsplan.js'

const App = () => {

    /*
    useEffect( () => {
        const getData = async () => {
        const response = await fetch(
            `https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan`,
            {
                method:'Post',
                mode:'no-cors',
                headers: {'Content-type':'application/json'}
            });
        const data = await response.json();
        setData(data);
        console.log(data);
    };
          getData().then(r => setData(r));
    }, []);
    */
    let laanebelop = payload.laanebelop;
    let nomiellRente = payload.nomiellRente;
    let terminGebyr = payload.terminGebyr;
    let datoForsteInnbetaling = payload.datoForsteInnbetaling;
    let saldoDato = payload.saldoDato
    let utlopsDato = payload.utlopsDato;

    let table = document.getElementById("myTable");
    const deleteRow = () => {
       table.deleteRow(1);
       computeSums();
    }
    const computeSums = () => {
        let tableBody = table.getElementsByTagName("tbody").item(0);
        let howManyRows = tableBody.rows.length;
        let value = 0;
        for (let j = 1; j < 5; j++) {
            for (let i = 1; i < (howManyRows - 2); i++) {
                let text = tableBody.rows[i].cells[j].childNodes.item(0).nodeValue;
                value += parseFloat(text.data);
            }
            tableBody.rows[howManyRows].cells[j].innerHTML += value + "kr";
        }
    }
    computeSums();

    return(
        <div className="App">
            <div>
                <h1>Nedbetalingsplan</h1>
                <button onClick={deleteRow}>Betal neste</button>
                <table className="table" id="myTable">
                    <tbody>
                    <tr>
                        <th>Betaling dato:</th>
                        <th>Renter</th>
                        <th>Terminbeløp</th>
                        <th>Avkastninger</th>
                        <th>Sum</th>
                    </tr>
                    <Nedbetalingsplan  belop={laanebelop} rente = {nomiellRente} termingebyr={terminGebyr}
                start={datoForsteInnbetaling} slutt={utlopsDato} saldoDato ={saldoDato}/>
                    <tr><td>Til slutt:</td><td>Sum renter:  </td><td>Sum terminbeløp: </td>
                        <td>Sum avkastninger: </td><td>Sum alt: </td></tr>
                    </tbody>
                    </table>
            </div>
        </div>
    )
}
export default App;
