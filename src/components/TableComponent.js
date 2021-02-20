import React,{useState,useEffect} from 'react'
import './TableComponent.css'
import PropTypes from 'prop-types';



const TableComponent = (props)=> {
    const [data,setData] = useState([])

    const checkAll = (data,setData) => {
        let temp = [...data]
    
        let action = !temp[0];
        for(let x  in temp) {
            temp[x] = action
        }
        
        setData(temp)
    }
    
    const checkMe = (data,setData,pos) => {
        let temp = [...data]
       temp[pos] = !temp[pos]
       if(!temp[pos])
            temp[0]=0
        setData(temp)
    }
    
    const renderColumns = (columns,columnNumber,data,setData) =>{
          
        return (
                columns?.map((item,key)=>(
                  
                        key==columnNumber? <th key={key} className="tb-header"><input type="checkbox" className="tb-checkbox" checked={!data[0]?false:true} onChange={()=>checkAll(data,setData)}/> {item.title}</th>: <th key={key}>{item.title}</th>
                )
                   
            )
        )
        
    }
    
    
    const renderRows= (rows,columnWithChecks,data,setData) =>{
    
            return (
                rows?.map((item,keys)=>{
                    return(
                        <tr key={keys}>
                            
                            { Object.keys(item).map((itm,key) =>{
                            return(
                                <td key={key} style={columnWithChecks==key?{justifyContent:'flex-start',whiteSpace:'nowrap'}: {} }> {columnWithChecks==key && <input className="tb-checkbox" type="checkbox" onChange={()=>checkMe(data,setData,keys+1)} checked={data[keys+1]?true:false} />}{item[itm]}</td>      
                            )
                           
                    })}
                        </tr>
                    )} 
                ))
    }

    useEffect(() => {
       let initialState = [...props.row]
        initialState.forEach((item,key)=>{
            initialState[key] = 0
       }
       )
       initialState.push(0)
       setData(initialState)

       return() => {

       }
    }, [])


    useEffect(() => {
       let temp = [...data]
       let count = 0
       for(let x  in data) {
            if(data[x])
            count++
       }
       if(count == data.length - 1){
           temp[0] = 1 
           setData(temp)
       }
    }, [data])

    return (
        <div data-test="TableComponent">
            <h1>Table content</h1>
            <table>
                <tbody key={1}>
                {renderColumns(props.column,props.columnWithChecks,data,setData)}
                {renderRows(props.row,props.columnWithChecks,data,setData)}
               
                </tbody>
            </table>
        </div>
    )
}


TableComponent.propTypes = {
    column: PropTypes.array,
    columnWithChecks: PropTypes.number,
    row: PropTypes.arrayOf(PropTypes.shape({
        key:PropTypes.string,
        name:PropTypes.string,
        age:PropTypes.number,
        address:PropTypes.string
    }))
}
export default TableComponent
