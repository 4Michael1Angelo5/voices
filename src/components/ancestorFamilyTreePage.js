import { InputText } from 'primereact/inputtext';
import { OrganizationChart } from 'primereact/organizationchart';
import { useState } from 'react';
import ExampleChart from './exampleChart';

 
const   ColoredDemo = () =>{
    const [data] = useState([
        {
            expanded: true,
            type: 'person',
            className: 'bg-indigo-500 text-white',
            style: { borderRadius: '12px' },
            data: {
                image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-purple-500 text-white',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Sales',
                            className: 'bg-purple-500 text-white',
                            style: { borderRadius: '12px' }
                        },
                        {
                            label: 'Marketing',
                            className: 'bg-purple-500 text-white',
                            style: { borderRadius: '12px' }
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-teal-500 text-white',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development',
                            className: 'bg-teal-500 text-white',
                            style: { borderRadius: '12px' }
                        },
                        {
                            label: 'UI/UX Design',
                            className: 'bg-teal-500 text-white',
                            style: { borderRadius: '12px' }
                        }
                    ]
                }
            ]
        }
    ]);

    const nodeTemplate = (node) => {
        if (node.type === 'person') {
            return (
                <div className="flex flex-column">
                    <div className="flex flex-column align-items-center">
                        <img alt={node.data.name} src={node.data.image} className="mb-3 w-3rem h-3rem" />
                        <span className="font-bold mb-2">{node.data.name}</span>
                        <span>{node.data.title}</span>
                    </div>
                </div>
            );
        }

        return node.label;
    };

    return (
        <div className="card overflow-x-auto">
            <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
            <ExampleChart/>
        </div>
    )
}
        

const AncestorFamilyTree = (props)=>{

    return(

        <div className = 'container'>
            <div className = 'row d-flex justify-content-center'>
                

                <h1>You've reached the ancestor family tree page</h1><br/>
                <h2> this is the name of the ansestor {props.ancestor.name}</h2>
                <InputText />
                <ColoredDemo/>

            </div>
          

        </div>

    );
}
export default AncestorFamilyTree