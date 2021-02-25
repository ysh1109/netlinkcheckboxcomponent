import React from 'react'
import ReactDom from 'react-dom'
import {shallow} from 'enzyme'
import TableComponent from './TableComponent'
import checkPropTypes from 'check-prop-types';

const dataSource = [
    {
      key: '1',
      name: 'test name',
      age: 32,
      address: 'testing address',
    },
    
  ];
  
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
  ];

  

//   it('renders without error',()=>{
//     const div = document.createElement('div')
//     ReactDOM.render(<TableComponent></TableComponent>,div)
        // const {getByTestId} = render(<TableComponent props></TableComponent>)
        // expect(getByTestId('button')).toHaveTextContent('Click me')
//   })


const setUpComponent = (props={}) => {
    const component = shallow( <TableComponent {...props}/>)
    return component
}

const findByTestAtrr = (component,attr)=>{
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};


describe('Table Component',()=>{


    describe('Checking PropTypes',()=>{

        it('should not a throw a warning',()=>{

            const expectedProps = {
                column: [],
                columnWithChecks: 22,
                row: [{
                    key:'1',
                    name:'test',
                    age:22,
                    address:'test address'
                }]
            }

            const propsError = checkPropTypes(TableComponent.propTypes,expectedProps,'props');

            expect(propsError).toBeUndefined()
        })
    })
 
    describe('Have props',()=>{

        
        let wrapper;
        beforeEach(()=>{
            const props = {
                row:dataSource,
                column:columns,
                columnWithChecks:2
            }
            wrapper = setUpComponent(props)
        })

        
        it('Should render without errors',()=>{
            const component = findByTestAtrr(wrapper,'TableComponent')
            expect(component.length).toBe(1);
        })
    })
    describe('Have No props',()=>{

        let wrapper;
        beforeEach(()=>{
            wrapper = setUpComponent()
        });

        it('should not render',()=>{
            const component = findByTestAtrr(wrapper,'TableComponent')
            expect(component.length).toBe(1)

        })
    })


})
