import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { OrgChart } from './d3-org-chart-mod';


export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  // const [centerCoordinates, setCenterCoordinates] = useState({"x":0,"y":0}) ; 
  // const [translateAmount , setTranslateAmount] = useState({"x":0,"y":0});
  // const [initZoom, setinitZoom] = useState(1);
  // const [lastZoom,setLastZoom] = useState(1)

   
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
        .expandAll()           
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
                                d.data.relationship
                              } </div>
  
                          </div>
                      </div>
                              `;
        })

        // .onZoomStart(e=>{

        //  let attrs = chart.getChartState();
        //  console.log(e.transform,"start")
        // //  console.log(attrs,"abe123")
        //  setinitZoom(e.transform)
 
        // })

        // .onZoomEnd(e=>{
        //   console.log(e.transform, "end") 

        //   setLastZoom(e.transform)

          
        // })

        // .creatZoom((e)=>{
          
        //   const attrs = chart.getChartState();
        //   attrs.transform= e.tranform

        // })         
         
        
        .onNodeClick( (d) => {
          
          // set ansetor/descendant focus to display information about currently selected ancestor/ descendant
          props.setAncestor(d.data) 
          
          // get chart state / attributes
          // let attrs = chart.getChartState(); 

          chart.setCentered(d.id).initialZoom(1.5).render() 

          // const nodeId = d.id; // Use the node's id
          // const nodeX = d.x + d.width / 2; // Center X of the node
          // const nodeY = d.y + d.height / 2; // Center Y of the node
      
          // console.log(`Node ID: ${nodeId}, Center: [${nodeX}, ${nodeY}]`);

          // this is our "to" coordinates

          // let centerX = attrs.calc.centerX; 
          // let centerY = attrs.calc.centerY; 

        // new code testing 

          // let translateX = d.x-centerX;
          // let translateY = d.y-centerY;

          // const newScale =  1.5;
          
        // console.log([centerX,centerY],"center coordinates using class methods") //this is working as expected
        
           

          // let p0 = [chart.lastTransform.x,chart.lastTransform.y] ; 
          // let p1 = [centerX,centerY];

          // const { svg, zoomBehavior } = attrs;  ;
          // // Get the current zoom and translation values
  
          
          // svg.transition()
          // .duration(750) // You can adjust the transition duration as needed
          // .call(
          //   zoomBehavior.transform,
          //   d3.zoomIdentity
          //   .translate(-nodeX, -nodeY)
          //     .scale(newScale)

            
          // );    
        
        })
        .nodeUpdate(function (d) {
          const currentlyHoveredElement = this;
          currentlyHoveredElement.addEventListener('click', (e) => {
          
             console.log(e.target)
            
          })})

        .scaleExtent([.5,3.5]) 
        
      
        .render();
    }

}, [props.orientation]);


// calculate translate amount for chart to set 
// clicked node to center of graph viewport
// const getTranslateAmount=(node)=>{


//   const initialPosition = [node.x0,node.y0];

//   const k = 1.5 // zoom scale factor 
  
//   const [w,h] = [centerCoordinates.x ,centerCoordinates.y]

//   const translate = [w / 2 - initialPosition[0] * k, h / 2 - initialPosition[1] * k]

//   setTranslateAmount(translate)

// }
// testing to make sure I'm not using stale number or getting false positives

// useEffect( ()=>{console.log(centerCoordinates,"center coordinates in useEffect")},[centerCoordinates]);

// useEffect( ()=>{console.log(translateAmount)},[translateAmount]);

// useEffect(()=>{console.log(lastZoom) },[lastZoom])

// useEffect(()=>{
//   // get height and width of container
//   const getCenterCoordinates = (ref)=>{

//     const x = ref.current.offsetWidth/2;// width 
  
//     const y = ref.current.offsetHeight/2; // height
  
//      setCenterCoordinates({"x":x, "y":y})    
     
  
//   }

//   if(treeContainer){
//     // if treeContainer is not null then...

//      getCenterCoordinates(treeContainer);
    
//   }

// },[])


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
