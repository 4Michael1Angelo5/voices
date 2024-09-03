import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { OrgChart } from './d3-org-chart-mod';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dialog } from 'primereact/dialog';
import { Tooltip } from 'primereact/tooltip';       
import * as d3 from 'd3'
import { mask } from 'primereact/utils';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  const [offset, setOffset] = useState(0) ;  
   
  const treeContainer = useRef(null)

  let chart

 
  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart 
        .container(d3Container.current)
        .compact(false)
        .svgHeight(500)
        .data(props.data)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 120)
        .layout("top") 
        .duration(500)              
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
          let attrs = chart.getChartState();
          // console.log(chart.lastTransform().k)
          chart.setCentered(d.id).initialZoom(1.5).render()        
          props.setAncestor(d.data)  
          console.log(attrs.lastTransform)        
        
        })

        .onZoomStart( (d=>{
          let attrs = chart.getChartState();
          console.log(attrs.lastTransform) 

        }))

        .onZoomEnd( (d=>{
          let attrs = chart.getChartState();
          console.log(attrs.lastTransform) 

        }))

        
        
        // .onZoomEnd(()=>{
        //   setTimeout(()=>props.setTimeWarp(false),3000);
        //   // setTimeout(()=>props.setTimeWarp(true),4000);
        // })
  


        .nodeUpdate(function (d) {
          const currentlyHoveredElement = this;
          currentlyHoveredElement.addEventListener('click', (e) => {
          
            console.log(e.target);
            
          })})

        .scaleExtent([.5,3.5]) 
        
      
        .render();
    }

}, [props.orientation]);


  return (
    <React.Fragment>
      <div className = 'tree-container'
        ref = {treeContainer}        
        >
        <div ref={d3Container} />
     
      </div>    
    </React.Fragment>


  );
};
