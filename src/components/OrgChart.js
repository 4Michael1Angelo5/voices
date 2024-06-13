import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { OrgChart } from 'd3-org-chart';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dialog } from 'primereact/dialog';
import { Tooltip } from 'primereact/tooltip';       
import * as d3 from 'd3'
import { mask } from 'primereact/utils';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  const [focus,setFocus] = useState(null)
  const [visible, setVisible] = useState(false);
  const [container , setContainer] = useState(null);
  const [offset, setOffset] = useState(0) ; 
  const [maskHeight, setMaskHeight] = useState(0);

  
  const op = useRef(null);
  const treeContainer = useRef(null)
 
  let chart;


 const zoomed = (e)=>{

  let attr = chart.getChartState();
  // from
  let x = e.x ; 
  let y = e.y ; 
  let k = attr.lastTransform.k

  let from  = [x,y,k] ; 

  // to 

  let to = [ 364,484,1.5] 

  console.log(attr.lastTransform.k , [x,y])
  let interpolator = d3.interpolateZoom(from,to)
 }

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart 
        .container(d3Container.current)
        .svgHeight(500)
        .data(props.data)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 120)        
        // .layout( props.orientation == "landscape"?"left":"top") 
        .layout("top")               
        .nodeContent(function (d, i, arr, state) {
          const color = '#263144';
          const imageDiffVert = 25 + 2;
          return `
                  <div style='width:${
                    d.width
                  }px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px;'
                  class = "ancestor-graph-node"> 
                          <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: 1px solid #E4E2E9">
                              <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">${
                                d.data.lifeSpan
                              }</div>
                              <div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                              <div style="margin-top:${
                                -imageDiffVert - 20
                              }px;">   <img src=" ${d.data.imageUrl}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
                              <div style="font-size:15px;margin-left:20px;margin-top:10px">  ${
                                d.data.name
                              } </div>
                              <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
                                d.data.position
                              } </div>
  
                          </div>
                      </div>
                              `;
        })
        
        .onNodeClick((d, i, arr) => {
          // let attrs = chart.getChartState();
          chart.setCentered(d.id).initialZoom(1.5).render()
          setFocus(d.data)
          props.setAncestor(d.data)
                 
          // console.log(d)
        
        })
        .nodeUpdate(function (d) {
          const currentlyHoveredElement = this;
          currentlyHoveredElement.addEventListener('click', (e) => {
            // console.log(e);
            setFocus(e.target)
            // op.current.toggle(e.target)
            // zoomed(e)
             setTimeout(()=>setVisible(true),1000);

            
            
          })})
        .scaleExtent([.5,3.5]) 
        
      
        .render();
    }

}, [props.orientation]);

// get width of container for family tree graph
useEffect(()=>{

  if (treeContainer != null){

    setOffset(treeContainer.current.offsetTop); 
    setMaskHeight(treeContainer.current.clientHeight)

 
  }


},[treeContainer])

// console.log(containerWidth)


// // handle mask clicks 

// const handleMaskClick = (e)=>{
//   console.log(e.pageX,e.pageY)
//   // panLeft(e)
//   center()
// }


// // create zoom behavior
// // set scale extent
// // call handleZoom func
// let zoom = d3.zoom()
// 	.scaleExtent([0.25, 10])
// 	.on('zoom', handleZoom);

  
// //  attach zoom behavior to svg graph
//   function initZoom() {
//     d3.select('svg')
//       .call(zoom);
//   }
  
//   // call 
//   function handleZoom(e) {
//     d3.select('svg g')
//       .attr('transform', e.transform);
//   }


//   //  move graph to the left 50px
//   function panLeft() {
//     d3.select('svg')
//       .transition()
//       .call(zoom.translateBy, -50,0);
//   }

  
  

//   function center() {
//     d3.select('svg')
//       .transition()
//       .call(zoom.translateTo, 0.5 * 500, 0.5 * containerWidth);
//   }
  


//   initZoom();

  return (
    <React.Fragment>
      <div className = 'tree-container'
        ref = {treeContainer}        
        >
      <div ref={d3Container} >
      </div>
      </div>   
    {  
    offset==0
    ?
    null
    :
      <>
      <div className = "mask-left"
        style = 
          {{
            height:`${maskHeight}px`,
            top: `${offset}px`,
            // backgroundColor:"red"        
          }}
        />
      <div className = 'mask-right'
        style = 
          {{
            height:`${maskHeight}px`,
            top: `${offset}px`,
            // backgroundColor:"red"        
          }}
        />
      <div className = 'mask-top'
        style = 
          {{
            top: `${offset}px`,
            // backgroundColor:"red"        
          }}
        />
      <div className = 'mask-bottom'
        style = 
          {{
            top: `${offset+500-50}px`,
            // backgroundColor:"red"        
          }}
        />

        </>
        }
     
      {/* <button onClick = { ()=> panLeft()}>Pan Left</button> */}
      {/* <div className = "mask" onClick = {e=>handleMaskClick(e)}>
      </div> */}
    </React.Fragment>


  );
};
