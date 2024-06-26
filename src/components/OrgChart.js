import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { OrgChart } from './d3-org-chart-mod';
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
        
          // setFocus(d.data)
          props.setAncestor(d.data)   
          // props.setTimeWarp(true)
          // props.setUseless(false)
          
        
        })
        
        // .onZoomEnd(()=>{
        //   setTimeout(()=>props.setTimeWarp(false),3000);
        //   // setTimeout(()=>props.setTimeWarp(true),4000);
        // })
  


        // .nodeUpdate(function (d) {
          // const currentlyHoveredElement = this;
          // currentlyHoveredElement.addEventListener('click', (e) => {
            // chart.zoomIn()
            // console.log(e.target);
            // setFocus(e.target)
            
          // props.setTimeWarp(true)
          // setTimeout(()=>props.setTimeWarp(false),2000) 
            // op.current.toggle(e.target)
             
            //  setTimeout(()=>setVisible(true),1000);
         
            
          // })})
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
      {/* <div className = "mask-left"
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
        /> */}

        </>
        }
    
    
    </React.Fragment>


  );
};
