function StockTable({listByTime, info}) {
    return (
        <div>
            <style>{`
                table{
                    border:1px solid white;
                }
                tr{
                    border:1px solid white;
                }
                td{
                    border:1px solid white;
                }`
            }</style>
            <table>
                <tbody>
                    <tr>
                        <td>19:55 utc </td>
                        <td>price type :{info.substring(2)}</td>
                    </tr>
                    {listByTime.map((value)=>{
                            return (<tr>{/*refactor*/}
                                    <td>{value[0]} </td>
                                    <td>$ {
                                        (info !== "5. volume") ?
                                            Number.parseFloat(value[1][info]).toFixed(2)
                                            : value[1][info]
                                        }
                                    </td>
                                </tr>)
                            }
                        )
                    }
                </tbody>
                
            </table>
        </div> 

    )
}

export default StockTable;