import React, { useLayoutEffect, useRef, useState } from 'react';
import { OrgChart } from 'd3-org-chart';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dialog } from 'primereact/dialog';
import { Tooltip } from 'primereact/tooltip';       
import * as d3 from 'd3'

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  const [focus,setFocus] = useState(null)
  const [visible, setVisible] = useState(false);
  
  const op = useRef(null);
 
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

  // uncomment above to revert back to original 

}, [props.orientation]);

// props.data, d3Container.current,

  return (
    <React.Fragment>
      <div ref={d3Container} >
      </div>
      {/* <OverlayPanel ref={op} appendTo  ={props.obj.current}>
      <img src={'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg'} alt="Bamboo Watch"></img>
      </OverlayPanel> */}
      {/* <Dialog dismissableMask ={true} position = "top" header={props.ancestor.name} visible={visible} modal={false} onHide={() => {if (!visible) return; setVisible(false); }}>
                <p className="m-0">
                    {props.ancestor.shortDescription}
                  
                </p>
      </Dialog> */}
    </React.Fragment>


  );
};
